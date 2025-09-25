import React, { useState } from 'react';

// Import shared tool components
import VeripillToolHeader from './components/VeripillToolHeader';
import VeripillToolHomePage from './components/VeripillToolHomePage';
import VerificationPage from './components/VerificationPage';
import VeripillToolFooter from './components/VeripillToolFooter';

function VeripillTool({ darkMode }) {
  const [toolPage, setToolPage] = useState('home');

  const handleToolNavigation = (pageId) => {
    setToolPage(pageId);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col`}>
      <VeripillToolHeader darkMode={darkMode} onNavigate={handleToolNavigation} />
      <main className="flex-grow">
        {toolPage === 'home' ? (
          <VeripillToolHomePage darkMode={darkMode} onNavigate={handleToolNavigation} />
        ) : (
          <VerificationPage darkMode={darkMode} />
        )}
      </main>
      <VeripillToolFooter darkMode={darkMode} />
    </div>
  );
}

export default VeripillTool;
