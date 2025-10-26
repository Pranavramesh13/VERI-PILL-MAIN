import React, { useEffect, useState } from 'react';

const defaultNews = [
  { title: 'Global Surge in Fake Ozempic Pens Sparks Health Warnings', content: 'Authorities in multiple countries have issued urgent alerts about counterfeit Ozempic pens, which contain insulin instead, leading to dangerous hypoglycemic shocks.', source: 'Reuters Health, 1 day ago' },
  { title: "Interpol's Operation Pangea XVI Seizes $7 Million in Illicit Medicines", content: 'A coordinated global crackdown has dismantled 30 criminal networks, resulting in the seizure of millions of potentially lethal counterfeit pills sold online.', source: 'Interpol Global News, 1 week ago' },
  { title: 'FDA Unveils AI Initiative to Bolster Drug Supply Chain Security', content: 'The U.S. FDA announced a new program utilizing AI to predict and intercept shipments of counterfeit pharmaceuticals before they enter the country.', source: 'FDA Press Office, 2 weeks ago' },
];

const NewsSliderSection = ({ darkMode, newsItems = defaultNews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % newsItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [newsItems.length]);

  return (
    <section id="news" className="py-24 bg-black isolate">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl font-extrabold text-white">The Global Fight Against Counterfeit Medicine</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          Stay informed with the latest developments and alerts from around the world.
        </p>
        <div className="mt-16 w-full max-w-5xl mx-auto bg-gray-900/60 rounded-xl border border-gray-700 p-8 overflow-hidden relative h-80">
          <div className="absolute top-4 left-0 right-0 mx-auto w-1/2 overflow-hidden"><div className="scanner-bar"></div></div>
          {newsItems.map((item, index) => (
            <div key={index} className="absolute top-0 left-0 w-full h-full p-8 transition-opacity duration-1000 ease-in-out flex flex-col justify-center" style={{ opacity: index === currentIndex ? 1 : 0 }}>
              <h3 className="text-3xl font-bold text-blue-400">{item.title}</h3>
              <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">{item.content}</p>
              <p className="mt-4 text-sm text-gray-500 italic">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSliderSection;
