
import React, { useState } from 'react';
import type { Competition } from './types';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PredictionPage from './pages/PredictionPage';
import AboutUsPage from './pages/AboutUsPage';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');

  // A curated list of top-tier competitions with IDs for TheSportsDB API
  const competitions: Competition[] = [
    { id: 2021, name: 'Premier League', code: 'PL', emblem: '', apiId: 4328 },
    { id: 2002, name: 'Bundesliga', code: 'BL1', emblem: '', apiId: 4331 },
    { id: 2014, name: 'La Liga', code: 'PD', emblem: '', apiId: 4335 },
    { id: 2019, name: 'Serie A', code: 'SA', emblem: '', apiId: 4332 },
    { id: 2015, name: 'Ligue 1', code: 'FL1', emblem: '', apiId: 4334 },
    { id: 2003, name: 'Eredivisie', code: 'DED', emblem: '', apiId: 4337 },
    { id: 2017, name: 'Primeira Liga', code: 'PPL', emblem: '', apiId: 4344 },
    { id: 10, name: 'UEFA Champions League', code: 'CL', emblem: '', apiId: 4480 },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={setActivePage} />;
      case 'prediction':
        return <PredictionPage competitions={competitions} />;
      case 'about':
        return <AboutUsPage />;
      default:
        return <HomePage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen text-white font-sans">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
