
import React from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center py-16 md:py-24 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
        Welcome to <span className="text-green-400">Gooal Zone</span>
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
        Harness the power of AI to get expert predictions for upcoming football matches. Select your teams and let our advanced model analyze the game.
      </p>
      <button
        onClick={() => onNavigate('prediction')}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
      >
        Start Predicting Now
      </button>

      <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-green-400">Data-Driven Insights</h3>
          <p className="text-gray-400">Our predictions are based on a vast amount of football knowledge, ensuring you get a well-informed perspective on every match.</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-green-400">Easy to Use</h3>
          <p className="text-gray-400">A simple, intuitive interface allows you to get from team selection to match prediction in just a few clicks.</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-green-400">Powered by Gemini</h3>
          <p className="text-gray-400">Leveraging Google's state-of-the-art Gemini model to provide nuanced and intelligent football analysis.</p>
        </div>
      </div>
       <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
