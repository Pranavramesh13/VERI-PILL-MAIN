import React from 'react';
import DemoVideo from '../components/DemoVideo';

const HeroSection = ({ onNavigateToTool }) => {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-16 pb-20 isolate">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <p className="font-bold text-blue-400">Trusted Medicine Verification</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-2 leading-tight whitespace-nowrap">Detect Fake Medicines Instantly</h2>
          <p className="mt-4 text-lg text-gray-300">
            Protect your health with AI-powered medicine authentication. Scan, verify, and ensure your medications are genuine and safe.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => onNavigateToTool('home')} className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
              Veripill 
            </button>
          </div>
          <DemoVideo />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
