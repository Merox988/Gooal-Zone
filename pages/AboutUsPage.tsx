
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 md:py-16 animate-fade-in">
      <h1 className="text-4xl font-black italic text-center mb-8">
        About <span className="text-green-400">Gooal Zone</span>
      </h1>
      <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 space-y-6 text-gray-300">
        <p>
          <strong>Gooal Zone</strong> is a cutting-edge web application designed for football enthusiasts who crave deeper insights into the beautiful game. Our mission is to blend the passion of football with the power of artificial intelligence to deliver accurate, data-informed match predictions.
        </p>
        <p>
          We believe that technology can enhance the fan experience by providing a new layer of analysis that goes beyond traditional punditry. Whether you're a fantasy football manager, a sports bettor, or simply a die-hard fan, Gooal Zone offers a unique perspective to inform your opinions and spark debate.
        </p>
        <div>
            <h3 className="text-xl font-bold mb-2 text-green-400">Our Technology</h3>
            <p>
            At the heart of Gooal Zone is Google's powerful <strong className="font-semibold text-white">Gemini API</strong>. This state-of-the-art AI model acts as our expert analyst, processing vast amounts of football knowledge to generate nuanced predictions. It considers factors like team form, historical performance, and tactical matchups to calculate the probabilities of a home win, a draw, or an away win.
            </p>
        </div>
        <p>
          We are committed to providing a clean, fast, and user-friendly experience. Thank you for visiting, and we hope you enjoy using Gooal Zone to get the edge in your football analysis!
        </p>
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

export default AboutUsPage;
