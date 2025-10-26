import React from 'react';

// Import section components (placeholders; implement these as needed)
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import NewsSliderSection from './components/NewsSliderSection';
import HowItWorksSection from './components/HowItWorksSection';
import CtaSection from './components/CtaSection';

const Home = ({ darkMode, onNavigateToTool }) => {
  return (
    <div className="container mx-auto p-4">
      <HeroSection darkMode={darkMode} onNavigateToTool={onNavigateToTool} />
      <WhyChooseSection darkMode={darkMode} onNavigateToTool={onNavigateToTool} />
      <NewsSliderSection darkMode={darkMode} />
      <HowItWorksSection darkMode={darkMode} />
      <CtaSection darkMode={darkMode} onNavigateToTool={onNavigateToTool} />
    </div>
  );
};

export default Home;
