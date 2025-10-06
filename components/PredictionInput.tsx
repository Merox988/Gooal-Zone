
import React, { useState, useEffect } from 'react';
import type { Competition, Team } from '../types';
import { getTeamsForCompetition } from '../services/footballApi';
import TeamSelectorCarousel from './TeamSelectorCarousel';

interface PredictionInputProps {
  onPredict: (homeTeam: string, awayTeam: string, competitionCode: string) => void;
  loading: boolean;
  competitions: Competition[];
}

const PredictionInput: React.FC<PredictionInputProps> = ({ onPredict, loading, competitions }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [competitionCode, setCompetitionCode] = useState(competitions[0]?.code || '');
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitionCode) return;

    const fetchTeams = async () => {
      setTeamsLoading(true);
      setTeamsError(null);
      setHomeTeam('');
      setAwayTeam('');
      setTeams([]);
      
      try {
        const competition = competitions.find(c => c.code === competitionCode);
        if (!competition) {
            throw new Error("Selected competition not found");
        }

        const competitionTeams = await getTeamsForCompetition(competition.apiId);
        competitionTeams.sort((a, b) => a.name.localeCompare(b.name));
        
        if (competitionTeams.length === 0) {
           setTeamsError("No teams found for this competition. The API may not provide data for it.");
        } else {
           setTeams(competitionTeams);
        }

      } catch (error) {
        console.error("Failed to fetch teams:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setTeamsError(`Could not load teams. ${errorMessage}`);
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchTeams();
  }, [competitionCode, competitions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam && awayTeam && competitionCode) {
      onPredict(homeTeam, awayTeam, competitionCode);
    }
  };

  const isButtonDisabled = !homeTeam || !awayTeam || homeTeam === awayTeam || loading;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
           <label htmlFor="competition" className="block text-sm font-medium text-gray-300 mb-2">
              1. Select Competition
            </label>
            <select
                id="competition"
                value={competitionCode}
                onChange={(e) => setCompetitionCode(e.target.value)}
                className="block w-full text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md py-2.5 px-3 text-white"
                required
            >
                {competitions.map((comp) => (
                    <option key={comp.id} value={comp.code}>
                    {comp.name}
                    </option>
                ))}
            </select>
        </div>
        
        {teamsLoading && (
            <div className="flex justify-center items-center p-8">
                <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spin border-green-500"></div>
                <p className="ml-4 text-gray-300">Loading teams...</p>
            </div>
        )}
        
        {teamsError && !teamsLoading && (
            <div className="text-center p-4 bg-red-900/30 rounded-md text-red-300">
                {teamsError}
            </div>
        )}

        {teams.length > 0 && !teamsLoading && (
            <>
                <TeamSelectorCarousel
                    label="2. Select Home Team"
                    teams={teams}
                    selectedTeam={homeTeam}
                    onSelect={setHomeTeam}
                    disabledTeam={awayTeam}
                />
                <TeamSelectorCarousel
                    label="3. Select Away Team"
                    teams={teams}
                    selectedTeam={awayTeam}
                    onSelect={setAwayTeam}
                    disabledTeam={homeTeam}
                />
            </>
        )}

        <div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white 
            ${isButtonDisabled ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500'}
            transition-all duration-300`}
            aria-live="polite"
          >
            {loading ? 'Analyzing...' : 'Analyze & Predict'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionInput;