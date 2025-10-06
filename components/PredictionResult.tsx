
import React from 'react';
import type { Prediction, TableEntry } from '../types';

interface PredictionResultProps {
  prediction: Prediction;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string | null;
  awayTeamLogo: string | null;
  homeTeamStats: TableEntry | null;
  awayTeamStats: TableEntry | null;
}

const StatRow: React.FC<{ label: string; homeValue: React.ReactNode; awayValue: React.ReactNode }> = ({ label, homeValue, awayValue }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-gray-700/50 last:border-b-0">
    <div className="w-2/5 text-lg font-bold text-white text-left">{homeValue}</div>
    <div className="w-1/5 text-xs text-gray-400 font-medium text-center uppercase tracking-wider">{label}</div>
    <div className="w-2/5 text-lg font-bold text-white text-right">{awayValue}</div>
  </div>
);

const renderForm = (form: string | null) => {
    if (!form) return <span className="text-gray-500">-</span>;
    return (
        <div className="flex justify-center gap-1">
            {form.split(',').slice(0, 5).map((result, index) => {
                const colors: { [key: string]: string } = {
                    'W': 'bg-green-500 text-white',
                    'D': 'bg-gray-500 text-white',
                    'L': 'bg-red-500 text-white'
                };
                return <span key={index} className={`flex items-center justify-center w-5 h-5 text-center rounded-full text-xs font-bold ${colors[result] || 'bg-gray-700'}`}>{result}</span>;
            })}
        </div>
    );
};


const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, homeTeam, awayTeam, homeTeamLogo, awayTeamLogo, homeTeamStats, awayTeamStats }) => {
  const { homeWinProbability, drawProbability, awayWinProbability, rationale, h2h } = prediction;

  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  const getGoalsPerGame = (stats: TableEntry | null) => {
    if (!stats || stats.playedGames === 0) return 'N/A';
    return (stats.goalsFor / stats.playedGames).toFixed(2);
  };
  
  const getConcededPerGame = (stats: TableEntry | null) => {
    if (!stats || stats.playedGames === 0) return 'N/A';
    return (stats.goalsAgainst / stats.playedGames).toFixed(2);
  };

  const getTeamInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  const showStats = homeTeamStats || awayTeamStats;

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 mb-4">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2">
                {homeTeamLogo ? (
                    <img src={homeTeamLogo} alt={`${homeTeam} logo`} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">{getTeamInitials(homeTeam)}</span>
                    </div>
                )}
                <h2 className="w-full text-lg md:text-xl font-bold text-white text-center truncate" title={homeTeam}>{homeTeam}</h2>
            </div>
            
            {/* "vs" separator */}
            <span className="text-xl font-light text-gray-400 pb-8 md:pb-10">vs</span>
            
            {/* Away Team */}
            <div className="flex flex-col items-center gap-2">
                {awayTeamLogo ? (
                    <img src={awayTeamLogo} alt={`${awayTeam} logo`} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">{getTeamInitials(awayTeam)}</span>
                    </div>
                )}
                <h2 className="w-full text-lg md:text-xl font-bold text-white text-center truncate" title={awayTeam}>{awayTeam}</h2>
            </div>
        </div>
        <p className="text-center text-sm text-gray-400 mb-6 font-medium tracking-wider uppercase -mt-2">Prediction</p>

        <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-300 mb-2 text-center">Outcome Probability</h3>
            <div className="flex w-full h-8 rounded-md overflow-hidden bg-gray-700 text-xs font-bold text-white">
                <div
                    className="flex items-center justify-center bg-green-500"
                    style={{ width: formatPercent(homeWinProbability) }}
                    title={`${homeTeam} Win: ${formatPercent(homeWinProbability)}`}
                >
                    {formatPercent(homeWinProbability)}
                </div>
                <div
                    className="flex items-center justify-center bg-gray-500"
                    style={{ width: formatPercent(drawProbability) }}
                    title={`Draw: ${formatPercent(drawProbability)}`}
                >
                    {formatPercent(drawProbability)}
                </div>
                <div
                    className="flex items-center justify-center bg-blue-500"
                    style={{ width: formatPercent(awayWinProbability) }}
                    title={`${awayTeam} Win: ${formatPercent(awayWinProbability)}`}
                >
                    {formatPercent(awayWinProbability)}
                </div>
            </div>
             <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                <span className="flex items-center">
                    {homeTeamLogo ? <img src={homeTeamLogo} alt="" className="w-4 h-4 mr-1.5 object-contain"/> : <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>}
                    {homeTeam} Win
                </span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-500 mr-1.5"></span>Draw</span>
                <span className="flex items-center">
                    {awayTeamLogo ? <img src={awayTeamLogo} alt="" className="w-4 h-4 mr-1.5 object-contain"/> : <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>}
                    {awayTeam} Win
                </span>
            </div>
        </div>

        <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-300 mb-2">AI Verdict</h3>
            <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                <p className="text-gray-200 italic">"{rationale}"</p>
            </div>
        </div>
        
        {showStats && (
           <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Season Statistics</h3>
            <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                <StatRow 
                    label="Position"
                    homeValue={homeTeamStats?.position || 'N/A'}
                    awayValue={awayTeamStats?.position || 'N/A'}
                />
                 <StatRow 
                    label="Goals / Game"
                    homeValue={getGoalsPerGame(homeTeamStats)}
                    awayValue={getGoalsPerGame(awayTeamStats)}
                />
                 <StatRow 
                    label="Conceded / Gm"
                    homeValue={getConcededPerGame(homeTeamStats)}
                    awayValue={getConcededPerGame(awayTeamStats)}
                />
                 <StatRow 
                    label="Form (Last 5)"
                    homeValue={renderForm(homeTeamStats?.form || null)}
                    awayValue={renderForm(awayTeamStats?.form || null)}
                />
            </div>
        </div>
        )}

        <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Head-to-Head</h3>
            <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
              <div className="flex justify-around text-center items-center">
                <div className="w-1/3">
                  <p className="text-2xl font-bold text-white mb-2">{h2h.homeWins}</p>
                  <div className="flex items-center justify-center gap-2">
                    {homeTeamLogo ? (
                        <img src={homeTeamLogo} alt={`${homeTeam} logo`} className="w-5 h-5 object-contain" />
                    ) : (
                        <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-[10px] leading-none">{getTeamInitials(homeTeam)}</span>
                        </div>
                    )}
                    <p className="text-xs text-gray-400">{homeTeam} Wins</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <p className="text-2xl font-bold text-white mb-2">{h2h.draws}</p>
                   <div className="flex items-center justify-center gap-2 h-5">
                    <p className="text-xs text-gray-400">Draws</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <p className="text-2xl font-bold text-white mb-2">{h2h.awayWins}</p>
                  <div className="flex items-center justify-center gap-2">
                    {awayTeamLogo ? (
                        <img src={awayTeamLogo} alt={`${awayTeam} logo`} className="w-5 h-5 object-contain" />
                    ) : (
                        <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-[10px] leading-none">{getTeamInitials(awayTeam)}</span>
                        </div>
                    )}
                    <p className="text-xs text-gray-400">{awayTeam} Wins</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

      </div>
       <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PredictionResult;