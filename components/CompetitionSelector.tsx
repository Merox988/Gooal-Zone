
import React from 'react';
import type { Competition } from '../types';

interface CompetitionSelectorProps {
  competitions: Competition[];
  selectedCompetition: string;
  onSelect: (competitionCode: string) => void;
}

const CompetitionSelector: React.FC<CompetitionSelectorProps> = ({
  competitions,
  selectedCompetition,
  onSelect,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <label htmlFor="competition-select" className="block text-sm font-medium text-gray-400 mb-2">
        Select a Competition
      </label>
      <div className="relative">
        <select
          id="competition-select"
          value={selectedCompetition}
          onChange={(e) => onSelect(e.target.value)}
          className="block w-full pl-3 pr-10 py-2.5 text-base bg-gray-700 border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md appearance-none text-white"
        >
          {competitions.map((comp) => (
            <option key={comp.id} value={comp.code}>
              {comp.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
           <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 7.03 7.78a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zm-3.72 9.28a.75.75 0 011.06 0L10 15.19l2.97-2.97a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompetitionSelector;
