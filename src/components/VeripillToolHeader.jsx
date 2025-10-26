import React from 'react';
import { ShieldCheckIcon, MarqueeOcrIcon, MarqueeQrIcon, MarqueeImageIcon, MarqueeShieldIcon } from './icons';
import GlobalScannerBar from './GlobalScannerBar';

const LogoMarquee = ({ onNavigate }) => {
  const logosWithColors = [
    { Component: MarqueeOcrIcon, color: 'bg-blue-500/30', pageId: 'ocr' },
    { Component: MarqueeQrIcon, color: 'bg-blue-500/30', pageId: 'qr' },
    { Component: MarqueeImageIcon, color: 'bg-blue-500/30', pageId: 'image' },
    { Component: MarqueeShieldIcon, color: 'bg-blue-500/30', pageId: 'home' }
  ];
  const extendedLogos = [...logosWithColors, ...logosWithColors, ...logosWithColors, ...logosWithColors];
  return (
    <div className="marquee-container hidden md:flex">
      <div className="marquee-content">
        {extendedLogos.map((logo, index) => (
          <div key={index} className={`logo-circle ${logo.color}`} onClick={() => onNavigate(logo.pageId)}>
            <logo.Component />
          </div>
        ))}
      </div>
    </div>
  );
};

const VeripillToolHeader = ({ onNavigate }) => {
  return (
    <header className="bg-black/50 backdrop-blur-md sticky top-0 z-50 shadow-lg isolate">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <ShieldCheckIcon />
            <h1 className="ml-2 text-xl font-bold text-gray-100">Veripill Tool</h1>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-4">
              <button onClick={() => onNavigate('ocr')} className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-gray-300 transition-all duration-300 bg-gray-800/50 rounded-lg shadow-lg group border border-gray-700 hover:text-white transform hover:scale-110">
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500/30 rounded-full blur-md ease-out transform -translate-x-40 -translate-y-20 group-hover:translate-x-0"></span>
                <span className="relative">Text (OCR)</span>
              </button>
              <button onClick={() => onNavigate('qr')} className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-gray-300 transition-all duration-300 bg-gray-800/50 rounded-lg shadow-lg group border border-gray-700 hover:text-white transform hover:scale-110">
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500/30 rounded-full blur-md ease-out transform -translate-x-40 -translate-y-20 group-hover:translate-x-0"></span>
                <span className="relative">QR Scan</span>
              </button>
              <button onClick={() => onNavigate('image')} className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-gray-300 transition-all duration-300 bg-gray-800/50 rounded-lg shadow-lg group border border-gray-700 hover:text-white transform hover:scale-110">
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500/30 rounded-full blur-md ease-out transform -translate-x-40 -translate-y-20 group-hover:translate-x-0"></span>
                <span className="relative">Image Analysis</span>
              </button>
            </nav>
            <LogoMarquee onNavigate={onNavigate} />
          </div>
        </div>
      </div>
      <GlobalScannerBar />
    </header>
  );
};

export default VeripillToolHeader;
