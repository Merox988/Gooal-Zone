
import React from 'react';
import type { Standing } from '../types';

interface StandingsTableProps {
  standings: Standing[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  if (!standings || standings.length === 0 || !standings[0].table) {
    return (
      <div className="p-8 text-center text-gray-400">
        No standings available for this competition.
      </div>
    );
  }

  const tableData = standings[0].table;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white w-10">#</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white min-w-[200px]">Team</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Played">MP</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Won">W</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Drawn">D</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Lost">L</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Goals For">GF</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Goals Against">GA</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Goal Difference">GD</th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white" title="Points">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900">
          {tableData.map((entry) => (
            <tr key={entry.team.id} className="hover:bg-gray-800/50 transition-colors duration-200">
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.position}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <div className="flex items-center">
                  <div className="h-6 w-6 flex-shrink-0">
                    <img className="h-6 w-6" src={entry.team.crest} alt={`${entry.team.name} crest`} />
                  </div>
                  <div className="ml-4 text-white font-medium">{entry.team.name}</div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.playedGames}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.won}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.draw}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.lost}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.goalsFor}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.goalsAgainst}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">{entry.goalDifference}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-white font-bold text-center">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
