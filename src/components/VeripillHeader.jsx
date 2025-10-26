import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoIcon } from './icons';

const VeripillHeader = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavClick = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Features', targetId: 'features', color: 'bg-blue-500/30' },
    { name: 'News', targetId: 'news', color: 'bg-blue-500/30' },
    { name: 'How It Works', targetId: 'howitworks', color: 'bg-blue-500/30' },
    // Route-based item for Report page
    { name: 'Report', route: '/report', color: 'bg-red-500/30' }
  ];

  return (
    <header className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} p-4 flex justify-between items-center`}>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/') }>
        <LogoIcon />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Veripill</h1>
      </div>
      <nav className={`hidden md:flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {navItems.map(item => (
          <a
            key={item.name}
            href={item.route ? item.route : `#${item.targetId}`}
            onClick={(e) => {
              e.preventDefault();
              if (item.route) {
                navigate(item.route);
              } else if (item.targetId) {
                handleNavClick(item.targetId);
              }
            }}
            className={`relative group px-4 py-2 rounded-lg transition-colors hover:text-white`}
          >
            <span className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${item.color} rounded-lg`}></span>
            <span className="relative">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <a href="#download" onClick={(e) => { e.preventDefault(); navigate('/tool'); }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition-all transform hover:scale-105">
          Use Web Tool
        </a>
        <button onClick={toggleDarkMode} className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`} aria-label="Toggle dark mode">
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default VeripillHeader;
