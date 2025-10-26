import React from 'react';

const CtaSection = ({ onNavigateToTool }) => (
  <section id="download" className="py-20 bg-black isolate">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      <h2 className="text-4xl font-extrabold text-white">Protect Your Health Today</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
        Don't risk your health with counterfeit medicines. Try the Veripill tool now and join millions of users who verify their medications daily.
      </p>
      <div className="mt-8 flex justify-center">
        <button onClick={() => onNavigateToTool('home')} className="w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:bg-blue-600">
          Veripill Tool
        </button>
      </div>
    </div>
  </section>
);

export default CtaSection;
