import React from 'react';

const HowItWorksSection = () => (
  <section id="howitworks" className="py-20 isolate">
    <div className="container mx-auto max-w-5xl px-4 text-center">
      <h2 className="text-4xl font-extrabold text-white">How Veripill Works</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
        Three simple steps to verify your medicines and protect your health.
      </p>
      <div className="mt-16 grid md:grid-cols-3 gap-8 items-start relative">
        <div className="hidden md:block absolute top-10 left-0 w-full h-0.5">
          <svg width="100%" height="2" className="stroke-current text-gray-700">
            <line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-900 border-2 border-blue-400 flex items-center justify-center text-2xl font-bold text-blue-400 z-10">01</div>
          <h3 className="mt-5 text-xl font-bold text-white">Scan Medicine</h3>
          <p className="mt-2 text-gray-400">Simply open the app and scan your medicine packaging, pills, or prescription bottle using your phone's camera.</p>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-900 border-2 border-blue-400 flex items-center justify-center text-2xl font-bold text-blue-400 z-10">02</div>
          <h3 className="mt-5 text-xl font-bold text-white">AI Analysis</h3>
          <p className="mt-2 text-gray-400">Our advanced AI instantly analyzes the visual features, text, and packaging details against our comprehensive database.</p>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-900 border-2 border-blue-400 flex items-center justify-center text-2xl font-bold text-blue-400 z-10">03</div>
          <h3 className="mt-5 text-xl font-bold text-white">Get Results</h3>
          <p className="mt-2 text-gray-400">Receive immediate verification results with detailed information about authenticity and safety recommendations.</p>
        </div>
      </div>
      <div className="mt-12 inline-flex items-center bg-gray-900/60 border border-gray-700 text-green-300 px-4 py-2 rounded-full">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        Average verification time: Under 3 seconds
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
