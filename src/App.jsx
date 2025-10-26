import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Shared Components
import VeripillHeader from './components/VeripillHeader';
import VeripillFooter from './components/VeripillFooter';
import Chatbot from './components/Chatbot';
import ChatbotFAB from './components/ChatbotFAB';
import StyleInjector from './components/Styles';

// Page Components
import Home from './pages/Home';
import VeripillTool from './pages/VeripillTool';
import Report from './pages/Report';

function AppRoutes() {
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <>
      <StyleInjector />
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
        <VeripillHeader darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
        <Routes>
          <Route 
            path="/" 
            element={<Home darkMode={darkMode} onNavigateToTool={() => navigate('/tool')} />} 
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
