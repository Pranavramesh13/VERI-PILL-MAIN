import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HeroSection from '../sections/HeroSection';
import WhyChooseSection from '../sections/WhyChooseSection';
import NewsSliderSection from '../sections/NewsSliderSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import CtaSection from '../sections/CtaSection';

const Home = ({ darkMode, onNavigateToTool }) => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state && location.state.scrollTo;
    if (scrollTo) {
      // Delay slightly to ensure sections are rendered
      const t = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(t);
    }
  }, [location.state]);

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
