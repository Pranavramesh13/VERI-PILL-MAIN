import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import VeripillToolHeader from '../components/VeripillToolHeader';
import VeripillToolHomePage from '../components/VeripillToolHomePage';
import VerificationPage from '../components/VerificationPage';
import VeripillToolFooter from '../components/VeripillToolFooter';

function VeripillTool({ darkMode }) {
  const navigate = useNavigate();

  const handleToolNavigation = (pageId) => {
    if (!pageId || pageId === 'home') {
      navigate('/tool');
    } else {
      navigate(`/tool/${pageId}`);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <VeripillToolHeader onNavigate={handleToolNavigation} />
      <main className="flex-grow">
        <Routes>
          <Route index element={<VeripillToolHomePage onNavigate={handleToolNavigation} />} />
          <Route path="ocr" element={<VerificationPage darkMode={darkMode} mode="ocr" />} />
          <Route path="qr" element={<VerificationPage darkMode={darkMode} mode="qr" />} />
          <Route path="image" element={<VerificationPage darkMode={darkMode} mode="image" />} />
          <Route path="*" element={<VeripillToolHomePage onNavigate={handleToolNavigation} />} />
        </Routes>
      </main>
      <VeripillToolFooter />
    </div>
  );
}

export default VeripillTool;
