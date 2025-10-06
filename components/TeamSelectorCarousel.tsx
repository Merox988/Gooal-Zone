
import React from 'react';
import type { Team } from '../types';

interface TeamSelectorCarouselProps {
  label: string;
  teams: Team[];
  selectedTeam: string;
  onSelect: (teamName: string) => void;
  disabledTeam?: string;
}

const TeamSelectorCarousel: React.FC<TeamSelectorCarouselProps> = ({
  label,
  teams,
  selectedTeam,
  onSelect,
  disabledTeam,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div 
        className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide"
        role="radiogroup"
        aria-label={label}
      >
        {teams.map((team) => {
          const isSelected = team.name === selectedTeam;
          const isDisabled = team.name === disabledTeam;
          const initials = team.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

          return (
            <button
              key={team.id}
              type="button"
              onClick={() => onSelect(team.name)}
              disabled={isDisabled}
              className={`relative flex-shrink-0 w-28 h-28 p-2 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all duration-200
                ${isSelected ? 'bg-green-500/20 border-green-500 scale-105 shadow-lg' : 'bg-gray-700/50 border-gray-600 hover:border-gray-400'}
                ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}
              `}
              role="radio"
              aria-checked={isSelected}
              aria-label={team.name}
            >
              {team.crest ? (
                <img 
                  src={team.crest} 
                  alt={`${team.name} crest`} 
                  className="w-12 h-12 object-contain"
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.4))' }}
                />
              ) : (
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{initials}</span>
                </div>
              )}
              <p className="text-xs text-center text-white font-medium truncate w-full">
                {team.name}
              </p>
            </button>
          );
        })}
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default TeamSelectorCarousel;