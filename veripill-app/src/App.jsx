import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Shared Components
import VeripillHeader from './components/VeripillHeader';
import VeripillFooter from './components/VeripillFooter';
import Chatbot from './components/Chatbot';
import ChatbotFAB from './components/ChatbotFAB';
import StyleInjector from './components/Styles';

// Page Components
import Home from './Home';
import VeripillTool from './VeripillTool';
import Report from './Report';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <BrowserRouter>
      <StyleInjector />
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
        <VeripillHeader darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
        <Routes>
          <Route 
            path="/" 
            element={<Home darkMode={darkMode} onNavigateToTool={(toolId) => { /* define navigation logic here */ }} />} 
          />
          <Route 
            path="/tool/*" 
            element={<VeripillTool darkMode={darkMode} />} 
          />
          <Route 
            path="/report" 
            element={<Report darkMode={darkMode} />} 
          />
        </Routes>
        <VeripillFooter />
        <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        <ChatbotFAB onClick={() => setIsChatOpen(!isChatOpen)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
