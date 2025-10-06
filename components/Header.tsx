import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <a href="/" className="flex items-center" aria-label="Gooal Zone Home">
          {/* New SVG Logo */}
          <svg
            className="w-auto h-10"
            viewBox="0 0 180 40"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="logo-title"
          >
            <title id="logo-title">Gooal Zone Logo</title>
            
            {/* Icon: Stylized football */}
            <g>
              <path
                d="M 20 0 C 8 0, 0 8, 0 20 C 0 32, 8 40, 20 40 C 32 40, 40 32, 40 20 C 40 8, 32 0, 20 0 Z"
                fill="#22C55E"
              />
              <polygon points="20,11 28,15.5 28,24.5 20,29 12,24.5 12,15.5" fill="#FFFFFF" />
              <polygon points="20,11 24,13.25 20,15.5 16,13.25" fill="#1F2937" />
              <polygon points="12,15.5 16,17.75 12,20" fill="#1F2937" opacity="0.7"/>
              <polygon points="12,24.5 16,22.25 12,20" fill="#1F2937" opacity="0.7"/>
              <polygon points="20,29 24,26.75 20,24.5" fill="#1F2937" opacity="0.7"/>
              <polygon points="28,24.5 24,22.25 28,20" fill="#1F2937" opacity="0.7"/>
              <polygon points="28,15.5 24,17.75 28,20" fill="#1F2937" opacity="0.7"/>
            </g>

            {/* Text: GOALZONE */}
            <text
              x="50"
              y="29"
              fontFamily="system-ui, sans-serif"
              fontSize="24"
              fontWeight="900"
              fontStyle="italic"
              fill="#FFFFFF"
              letterSpacing="-1"
            >
              GOAL<tspan fill="#22C55E">ZONE</tspan>
            </text>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
