
import React, { useState } from 'react';
import type { Competition, Prediction, TableEntry } from '../types';
import { getPrediction } from '../services/geminiApi';
import { getStandings, getTeamLogo } from '../services/footballApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PredictionInput from '../components/PredictionInput';
import PredictionResult from '../components/PredictionResult';

interface PredictionPageProps {
  competitions: Competition[];
}

const PredictionPage: React.FC<PredictionPageProps> = ({ competitions }) => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [matchDetails, setMatchDetails] = useState<{ 
    homeTeam: string; 
    awayTeam: string; 
    homeTeamLogo: string | null; 
    awayTeamLogo: string | null;
    homeTeamStats: TableEntry | null;
    awayTeamStats: TableEntry | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (homeTeam: string, awayTeam: string, competitionCode: string) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    setMatchDetails(null);

    const competition = competitions.find(c => c.code === competitionCode);
    if (!competition) {
      setError("Invalid competition selected.");
      setLoading(false);
      return;
    }

    try {
      const [homeTeamLogo, awayTeamLogo, predictionResult, standingsResponse] = await Promise.all([
        getTeamLogo(homeTeam),
        getTeamLogo(awayTeam),
        getPrediction(homeTeam, awayTeam, competition.name),
        getStandings(competition.apiId).catch(e => {
          console.warn(`Could not fetch standings for ${competition.code}:`, e);
          return null;
        }),
      ]);
      
      const table = standingsResponse?.standings[0]?.table || [];
      const homeTeamStats = table.find(entry => entry.team.name.toLowerCase() === homeTeam.toLowerCase()) || null;
      const awayTeamStats = table.find(entry => entry.team.name.toLowerCase() === awayTeam.toLowerCase()) || null;

      setMatchDetails({ homeTeam, awayTeam, homeTeamLogo, awayTeamLogo, homeTeamStats, awayTeamStats });
      setPrediction(predictionResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while generating the prediction.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PredictionInput 
        onPredict={handlePredict} 
        loading={loading}
        competitions={competitions} 
      />

      <div className="mt-8">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {prediction && matchDetails && !loading && !error && (
          <PredictionResult 
            prediction={prediction}
            homeTeam={matchDetails.homeTeam}
            awayTeam={matchDetails.awayTeam}
            homeTeamLogo={matchDetails.homeTeamLogo}
            awayTeamLogo={matchDetails.awayTeamLogo}
            homeTeamStats={matchDetails.homeTeamStats}
            awayTeamStats={matchDetails.awayTeamStats}
          />
        )}
      </div>
    </div>
  );
}

export default PredictionPage;
