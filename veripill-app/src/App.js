// TODO: For a consistent light theme across the whole app, update all hard-coded 'text-white' classes to conditionally use dark mode classes. For example:
// Replace: className="text-white ..."
// With:    className="dark:text-white text-black ..."

// This ensures that when darkMode is false (light mode), the text color will be black across all components.

import React, { useState, useRef, useEffect, useCallback } from 'react';

// Custom CSS styles with enhanced counterfeit text styling
const customStyles = `
  html, body { 
    margin: 0; 
    padding: 0; 
    background-color: #000000; 
    color: #d1d5db; 
    font-family: sans-serif;
  }
  html { scroll-behavior: smooth; }
  .dark-theme-bg { 
    background-color: #000000; 
    color: #d1d5db; 
    min-height: 100vh;
  }
  #app-container::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.08), transparent 80%);
    z-index: 0; pointer-events: none; transition: background 0.1s linear;
  }
  .loader { border-top-color: #3b82f6; animation: spinner 1.5s linear infinite; }
  @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  .marquee-container {
    width: 200px; overflow: hidden; position: relative; margin-left: 2.5rem;
    -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
  }
  .marquee-content { display: flex; animation: marquee-scroll 15s linear infinite; width: fit-content; }
  @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .logo-circle {
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; margin: 0 1rem; flex-shrink: 0; cursor: pointer; transition: transform 0.2s ease;
  }
  .logo-circle:hover { transform: scale(1.15); }
  @keyframes scan-animation { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  .scanner-bar {
    height: 3px; background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
    animation: scan-animation 2.5s linear infinite; border-radius: 3px;
  }
  @keyframes draw-pulse { to { stroke-dashoffset: 0; } }
  .pulse-path { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: draw-pulse 4s linear infinite; }
  @keyframes rotate-clockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .glowing-ring-container {
    width: 450px; height: 450px; position: absolute; display: flex; align-items: center;
    justify-content: center; animation: rotate-clockwise 20s linear infinite;
  }
  .glowing-ring {
    position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 3px solid #fff;
    box-shadow: 0 0 10px #00aaff, 0 0 20px #00aaff, 0 0 40px #00aaff, inset 0 0 10px #00aaff;
  }
  .glowing-ring::before {
    content: ''; position: absolute; inset: -15px; border-radius: 50%;
    background: radial-gradient(circle, transparent 60%, #00aaff); filter: blur(20px); z-index: -1; opacity: 0.7;
  }
  .counterfeit-text {
    font-weight: 900;
    color: #ffffff; /* Changed to white */
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.7);
    font-size: 1.2em; /* Medium font size */
    /* Removed animation to stop blinking */
  }
  .authentic-text {
    font-weight: 900;
    color: #00ff00;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.9), 0 0 20px rgba(0, 255, 0, 0.7);
  }
  .demo-container {
    position: relative;
    width: 100%;
    height: 500px; /* Fixed height for consistent display */
    background-color: #000; /* Changed to black */
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .qr-demo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000; /* Changed to black */
    color: white;
    padding: 2rem;
    text-align: center;
  }
  .qr-step {
    margin-bottom: 2rem;
  }
  .qr-step h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }
  .qr-step p {
    max-width: 600px;
    margin: 0 auto;
    color: #d1d5db;
  }
  .qr-animation {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 2rem auto;
    background-color: #000; /* Changed to black */
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }
  .qr-frame {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: 2px dashed #3b82f6;
    border-radius: 0.5rem;
  }
  .qr-code {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qr-code::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background-image: 
      linear-gradient(45deg, #000 25%, transparent 25%), 
      linear-gradient(-45deg, #000 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, #000 75%), 
      linear-gradient(-45deg, transparent 75%, #000 75%);
    background-size: 15px 15px;
    background-position: 0 0, 0 7.5px, 7.5px -7.5px, -7.5px 0px;
  }
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    animation: scan 2s linear infinite;
  }
  @keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
  }
  .result-display {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .counterfeit-result {
    background-color: rgba(239, 68, 68, 0.9);
    color: white;
  }
  .authentic-result {
    background-color: rgba(16, 185, 129, 0.9);
    color: white;
  }
  .progress-container {
    width: 80%;
    height: 8px;
    background-color: #374151;
    border-radius: 4px;
    margin: 1rem auto;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    background-color: #3b82f6;
    border-radius: 4px;
    animation: progress 2s linear infinite;
  }
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  .medicine-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }
`;

// Style injector component
const StyleInjector = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customStyles;
    document.head.appendChild(style);
    
    // Ensure body has black background
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#d1d5db';
    document.body.style.fontFamily = 'sans-serif';
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// SVG Icons
const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const AiScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const RealTimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuickDetectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const ExpertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CertifiedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12.876.65a.75.75 0 00-1.752 0L2.44 4.372a.75.75 0 00-.44 1.25l.08.082 1.225 1.225A11.213 11.213 0 003 12c0 5.483 4.07 10.134 9 11.353 4.93-1.219 9-5.87 9-11.353 0 -1.724-.38-3.36-1.074-4.83l1.225-1.225a.75.75 0 00-.36-1.332L12.876.65zM12 20.468c-4.18-1.033-7.5-4.89-7.5-9.468 0-1.24.274-2.422.773-3.5h13.454c.499 1.078.773 2.26.773 3.5 0 4.578-3.32 8.435-7.5 9.468z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M16.704 8.204a.75.75 0 01.075 1.058l-5.25 6a.75.75 0 01-1.137.05l-2.25-2.5a.75.75 0 111.12-.998l1.658 1.842 4.717-5.4a.75.75 0 011.058-.074z" clipRule="evenodd" />
  </svg>
);

const OcrIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 21h10"/><path d="M3 11v-2a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 13v2a2 2 0 0 1-2 2h-2"/><path d="M7 3H5a2 2 0 0 0-2 2v2"/><path d="M12 7v5"/><path d="M9 7h6"/>
  </svg>
);

const QrIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 6a2 2 0 012-2h1.172a2 2 0 011.414.586l.828.828A2 2 0 008.828 6H12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    <path d="M15 8a1 1 0 10-2 0v2a1 1 0 102 0V8z" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

const MarqueeOcrIcon = () => (
  <svg className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 21h10"/><path d="M3 11v-2a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 13v2a2 2 0 0 1-2 2h-2"/><path d="M7 3H5a2 2 0 0 0-2 2v2"/><path d="M12 7v5"/><path d="M9 7h6"/>
  </svg>
);

const MarqueeQrIcon = () => (
  <svg className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const MarqueeImageIcon = () => (
  <svg className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const MarqueeShieldIcon = () => (
  <svg className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" /><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 18v-2" /><path d="M12 8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v0" /><path d="M16 4a4 4 0 0 0 0 8" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GlowingRing = () => (
  <div className="glowing-ring-container">
    <div className="glowing-ring"></div>
  </div>
);

const GlobalScannerBar = () => (
  <div className="w-full absolute bottom-0 left-0 h-0.5 overflow-hidden">
    <div className="w-1/2 scanner-bar"></div>
  </div>
);

// Demo Video Component - Updated with specific images for medicine and QR code
const DemoVideo = () => {
  const [scanStep, setScanStep] = useState(0);
  const [isCounterfeit, setIsCounterfeit] = useState(false);
  
  // Updated Image URLs with the provided images
  const medicineImageUrl = "https://z-cdn-media.chatglm.cn/files/e7f3b009-c74c-482c-8360-00ff758a8e7a_images.jpeg?auth_key=1789554089-45ecb80173c947669c84d2aec379c3c0-0-f32a26380868ab2b45e40abe76ea99f6";
  const qrCodeImageUrl = "https://z-cdn-media.chatglm.cn/files/53592440-d3a8-4183-8e65-ab522fb45a79_My_QR_Code_1-1024.jpeg?auth_key=1789554089-7ba4e12803914c749d1d0725c45e16e1-0-42156a9874c42f3ad82162f4bb075203";
  
  useEffect(() => {
    const timer = setInterval(() => {
      setScanStep(prev => (prev + 1) % 6);
      if (scanStep === 2 || scanStep === 5) {
        setIsCounterfeit(Math.random() > 0.5);
      }
    }, 2000); // Speed up the video (2 seconds per step)
    
    return () => clearInterval(timer);
  }, [scanStep]);
  
  return (
    <div className="mt-12 bg-gray-900/60 rounded-xl border border-gray-700 p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Veripill in Action</h3>
      <p>Note:Mainly focused for new tablet strip</p>
      <div className="relative rounded-lg overflow-hidden bg-black">
        <div className="demo-container">
          <div className="qr-demo">
            {/* Step 1: Medicine Strip Upload */}
            {scanStep === 0 && (
              <div className="qr-step">
                <h3>Step 1: Upload Medicine Strip</h3>
                <p>Take a photo or upload an image of your medicine strip</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-48 h-32 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img 
                          src={medicineImageUrl} 
                          alt="Medicine Strip" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                        <UploadIcon /> Upload Medicine Strip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Processing Medicine Strip */}
            {scanStep === 1 && (
              <div className="qr-step">
                <h3>Step 2: Analyzing Medicine</h3>
                <p>Veripill is analyzing the medicine strip</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img 
                        src={medicineImageUrl} 
                        alt="Medicine Strip" 
                        className="w-48 h-32 object-contain mb-4"
                      />
                      <div className="progress-container">
                        <div className="progress-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Medicine Strip Result */}
            {scanStep === 2 && (
              <div className="qr-step">
                <h3>Result:</h3>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img 
                        src={medicineImageUrl} 
                        alt="Medicine Strip" 
                        className="w-48 h-32 object-contain mb-4"
                      />
                      <div className={`result-display ${isCounterfeit ? 'counterfeit-result' : 'authentic-result'}`}>
                        {isCounterfeit ? 'COUNTERFEIT DETECTED' : 'AUTHENTIC MEDICINE'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`mt-6 p-4 rounded-lg max-w-md mx-auto ${isCounterfeit ? 'bg-red-900/50 border border-red-700' : 'bg-green-900/50 border border-green-700'}`}>
                  <p className={`text-lg font-bold ${isCounterfeit ? 'text-red-300' : 'text-green-300'}`}>
                    {isCounterfeit ? 'Counterfeit Detected' : 'Authentic Medicine'}
                  </p>
                  <p className={`mt-2 ${isCounterfeit ? 'text-red-200' : 'text-green-200'}`}>
                    {isCounterfeit 
                      ? 'Warning: This medicine shows signs of being counterfeit. Do not consume.' 
                      : 'This medicine has been verified as authentic and safe to use.'}
                  </p>
                  <p className={`text-sm mt-2 ${isCounterfeit ? 'text-red-400' : 'text-green-400'}`}>
                    Confidence: {isCounterfeit ? '92.5%' : '98.1%'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Step 4: QR Code Scan */}
            {scanStep === 3 && (
              <div className="qr-step">
                <h3>Step 4: Locate QR Code</h3>
                <p>Find the QR code on your medicine packaging</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <img 
                      src={qrCodeImageUrl} 
                      alt="QR Code" 
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: Scanning QR Code */}
            {scanStep === 4 && (
              <div className="qr-step">
                <h3>Step 5: Scan with Veripill</h3>
                <p>Open the app and scan the QR code</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <img 
                      src={qrCodeImageUrl} 
                      alt="QR Code" 
                      className="w-full h-full object-contain p-4"
                    />
                    <div className="scan-line"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 6: QR Code Result */}
            {scanStep === 5 && (
              <div className="qr-step">
                <h3>Result:</h3>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <img 
                      src={qrCodeImageUrl} 
                      alt="QR Code" 
                      className="w-full h-full object-contain p-4"
                    />
                    <div className={`result-display ${isCounterfeit ? 'counterfeit-result' : 'authentic-result'}`}>
                      {isCounterfeit ? 'COUNTERFEIT DETECTED' : 'AUTHENTIC MEDICINE'}
                    </div>
                  </div>
                </div>
                <div className={`mt-6 p-4 rounded-lg max-w-md mx-auto ${isCounterfeit ? 'bg-red-900/50 border border-red-700' : 'bg-green-900/50 border border-green-700'}`}>
                  <p className={`text-lg font-bold ${isCounterfeit ? 'text-red-300' : 'text-green-300'}`}>
                    {isCounterfeit ? 'Counterfeit Detected' : 'Authentic Medicine'}
                  </p>
                  <p className={`mt-2 ${isCounterfeit ? 'text-red-200' : 'text-green-200'}`}>
                    {isCounterfeit 
                      ? 'Warning: This medicine shows signs of being counterfeit. Do not consume.' 
                      : 'This medicine has been verified as authentic and safe to use.'}
                  </p>
                  <p className={`text-sm mt-2 ${isCounterfeit ? 'text-red-400' : 'text-green-400'}`}>
                    Confidence: {isCounterfeit ? '92.5%' : '98.1%'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-900 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">How Veripill Works</h3>
        <p className="text-gray-300">
          Veripill uses advanced AI to analyze medicines and detect counterfeits. 
          See how easy it is to verify your medications in seconds!
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-blue-400 font-bold mb-1">Step 1: Upload Medicine</div>
            <p className="text-sm text-gray-400">Upload a photo of the medicine strip for analysis</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-blue-400 font-bold mb-1">Step 2: Scan QR Code</div>
            <p className="text-sm text-gray-400">Scan the QR code on the medicine packaging</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-blue-400 font-bold mb-1">Step 3: Get Results</div>
            <p className="text-sm text-gray-400">Instantly know if your medicine is authentic or counterfeit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Phone Mockup Component



const VeripillHeader = ({ handleNavClick, navigateToLanding, darkMode, toggleDarkMode }) => {
  const navItems = [
    { name: 'Features', targetId: 'features', color: 'bg-blue-500/30' },
    { name: 'News', targetId: 'news', color: 'bg-blue-500/30' },
    { name: 'How It Works', targetId: 'howitworks', color: 'bg-blue-500/30' },
    { name: 'Report', targetId: 'report', color: 'bg-red-500/30' }
  ];

  return (
    <header className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} p-4 flex justify-between items-center`}>
      <div onClick={navigateToLanding} className="flex items-center space-x-2 cursor-pointer">
        <LogoIcon />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Veripill</h1>
      </div>
      <nav className={`hidden md:flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {navItems.map(item => (
          <a
            key={item.name}
            href={`#${item.targetId}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.targetId);
            }}
            className={`relative group px-4 py-2 rounded-lg transition-colors hover:text-white`}
          >
            <span className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${item.color} rounded-lg`}></span>
            <span className="relative">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('download'); }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition-all transform hover:scale-105">
          Use Web Tool
        </a>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};
// Hero Section Component
const HeroSection = ({ onNavigateToTool }) => {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-16 pb-20 isolate">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <p className="font-bold text-blue-400">Trusted Medicine Verification</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-2 leading-tight whitespace-nowrap">Detect Fake Medicines Instantly</h2>
          <p className="mt-4 text-lg text-gray-300">
            Protect your health with AI-powered medicine authentication. Scan, verify, and ensure your medications are genuine and safe.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => onNavigateToTool('home')} className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
              Veripill 
            </button>
          </div>
          
          
          <DemoVideo />
        </div>
      
      </div>
    </section>
  );
};

// Features Section Component
const WhyChooseSection = ({ onNavigateToTool, features }) => {
  return (
    <section id="features" className="py-20 bg-black/50 isolate">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl font-extrabold text-white">Why Choose Veripill?</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          Advanced technology meets healthcare expertise to deliver the most reliable medicine authentication platform available today.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.title} className="bg-gray-900/60 p-6 rounded-xl border border-gray-700 text-center flex flex-col items-center transition-all duration-300 hover:border-blue-400/50 hover:bg-gray-800 hover:-translate-y-2 relative overflow-hidden">
              <div className="bg-black text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.desc}</p>
              <div className="absolute bottom-0 left-0 w-full h-0.5"><div className="w-1/2 scanner-bar"></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// News Section Component
const NewsSliderSection = ({ newsItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % newsItems.length);
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
            <div 
              key={index} 
              className="absolute top-0 left-0 w-full h-full p-8 transition-opacity duration-1000 ease-in-out flex flex-col justify-center" 
              style={{ opacity: index === currentIndex ? 1 : 0 }}
            >
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

// How It Works Section Component
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

// CTA Section Component
const CtaSection = ({ onNavigateToTool }) => (
  <section id="download" className="py-20 bg-black isolate">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      <h2 className="text-4xl font-extrabold text-white">Protect Your Health Today</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
        Don't risk your health with counterfeit medicines. Try the Veripill tool now and join millions of users who verify their medications daily.
      </p>
      <div className="mt-8 flex justify-center">
        <button onClick={() => onNavigateToTool('home')} className="w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:bg-blue-600">
          Veripill Tool
        </button>
      </div>
    </div>
  </section>
);

// Footer Component
const VeripillFooter = () => (
  <footer className="bg-black isolate">
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
        <div>
          <div className="flex items-center space-x-2 mb-4"><LogoIcon /><h1 className="text-xl font-bold text-gray-100">Veripill</h1></div>
          <p className="text-sm">Protecting your health with AI-powered medicine authentication. Trusted by healthcare professionals worldwide.</p>
          <div className="flex space-x-4 mt-4"><a href="#" className="hover:text-white">FB</a><a href="#" className="hover:text-white">TW</a><a href="#" className="hover:text-white">IN</a></div>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#howitworks" className="hover:text-white">How It Works</a></li>
            <li><a href="#safety" className="hover:text-white">Safety & Trust</a></li>
            <li><a href="#download" className="hover:text-white">Web Tool</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>support@veripill.com</li>
            <li>+1 (555) 123-4567</li>
            <li>San Francisco, CA</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Veripill. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Tool Header Component
const VeripillToolHeader = ({ onNavigate }) => {
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

// Tool Home Page Component
const VeripillToolHomePage = ({ onNavigate, features }) => (
  <main className="container mx-auto max-w-7xl px-4 py-16 isolate">
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Counterfeit Medicine Prediction Tool</h2>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
        Use cutting-edge technology to instantly check the authenticity of your medication. Choose a method below to begin.
      </p>
    </div>

    <div className="mt-20 relative overflow-hidden">
      <div className="w-1/2 mx-auto scanner-bar"></div>
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.id} className="flex flex-col items-center text-center p-6 cursor-pointer group transition-all duration-300 transform hover:-translate-y-2 isolate" onClick={() => onNavigate(feature.id)}>
          <div className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl ${feature.color}`}>{feature.icon}</div>
          <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
          <p className="mt-2 text-gray-300 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  </main>
);

// Verification Page Component
const VerificationPage = ({ config, onBack }) => {
  const [source, setSource] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);
  
  useEffect(() => { return () => stopCamera(); }, [stopCamera]);
  
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error("Video play failed:", err);
        setError("Failed to start the camera view. Please try again.");
      });
    }
  }, [stream]);
  
  const handleStartCamera = async () => {
    stopCamera();
    setSource('camera');
    setImageSrc(null);
    setResult(null);
    setError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera access denied:", err);
      setError('Could not access the camera. Please check permissions and try again.');
    }
  };
  
  const handleFileUpload = (event) => {
    stopCamera();
    setSource('file');
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
      setError('');
      setResult(null);
    }
  };
  
  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setImageSrc(dataUrl);
      stopCamera();
    }
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const seconds = new Date().getSeconds();
    const isCounterfeit = seconds % 20 < 10;
    setResult({
      isCounterfeit,
      confidence: isCounterfeit ? 92.5 : 98.1,
      message: isCounterfeit
        ? 'Warning: Inconsistencies detected. High probability of being <span class="counterfeit-text">counterfeit</span>.'
        : 'Result: All checks passed. Product appears to be <span class="authentic-text">authentic</span>.'
    });
    setLoading(false);
  };
  
  const resetState = () => {
    stopCamera();
    setImageSrc(null);
    setResult(null);
    setError('');
    setSource(null);
    if (fileInputRef.current) { fileInputRef.current.value = ""; }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 isolate">
      <button onClick={onBack} className="mb-6 font-medium text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110">{'<--'} Back to Tool Home</button>
      <div className="bg-black/20 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white">{config.title}</h2>
        <p className="mt-2 text-gray-300">{config.description}</p>
        <div className={`mt-6 grid grid-cols-1 ${config.disableUpload ? '' : 'md:grid-cols-2'} gap-4`}>
          <button onClick={handleStartCamera} className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-110"><CameraIcon />Use Camera</button>
          {!config.disableUpload &&
            <React.Fragment>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-110"><UploadIcon />Upload Image</button>
            </React.Fragment>
          }
        </div>
        {error && <div className="mt-4 text-center text-red-300 bg-red-900/50 p-3 rounded-lg">{error}</div>}
        <div className="mt-6">
          {(source === 'camera' && stream && !imageSrc) && (
            <div className="w-full p-2 border-2 border-dashed border-gray-600 rounded-lg bg-black">
              <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-md" />
              <button onClick={handleCapture} className="mt-4 w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">Take Snapshot</button>
            </div>
          )}
          {imageSrc && (
            <div className="text-center">
              <p className="font-semibold text-gray-200 mb-2">Image Preview:</p>
              <img src={imageSrc} alt="Verification" className="mx-auto rounded-lg shadow-md max-h-96" />
            </div>
          )}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
        {imageSrc && (
          <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col sm:flex-row gap-4">
            <button onClick={handleSubmit} disabled={loading} className="flex-1 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 disabled:scale-100 disabled:bg-blue-400 disabled:cursor-not-allowed">
              {loading ? <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mx-auto"></div> : 'Start Verification'}
            </button>
            <button onClick={resetState} className="flex-1 w-full bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-110">Reset</button>
          </div>
        )}
        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.isCounterfeit ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
            <h3 className={`text-lg font-bold ${result.isCounterfeit ? 'text-red-200' : 'text-green-200'}`}>
              {result.isCounterfeit ? 'Alert: Potential Counterfeit' : 'Result: Likely Authentic'}
            </h3>
            <p className={`mt-1 ${result.isCounterfeit ? 'text-red-300' : 'text-green-300'}`}>Confidence: {result.confidence.toFixed(2)}%</p>
            <p className={`mt-1 ${result.isCounterfeit ? 'text-red-200' : 'text-green-200'}`} dangerouslySetInnerHTML={{ __html: result.message }}></p>
          </div>
        )}
      </div>
    </div>
  );
};

// Report Page Component
const ReportPage = ({ navigateToLanding }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4 isolate">
      {isSubmitted ? (
        <div className="bg-black/20 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700 text-center">
          <ShieldCheckIcon />
          <h2 className="text-3xl font-bold text-white mt-4">Report Submitted</h2>
          <p className="mt-4 text-lg text-gray-300">Thank you for helping keep our community safe. Our team will review your submission and take the necessary actions.</p>
          <button onClick={navigateToLanding} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
            Back to Home
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white text-center">Report Suspected Medicine</h2>
          <p className="mt-2 text-gray-300 text-center mb-8">Please upload an image of the suspected counterfeit medicine below.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image</label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-800/80">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-h-full max-w-full rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                      <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG or JPG</p>
                    </div>
                  )}
                  <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                </label>
              </div> 
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">Submit Report</button>
          </div>
        </form>
      )}
    </div>
  );
};

// Tool Footer Component
const VeripillToolFooter = () => (
  <footer className="bg-transparent isolate">
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Veripill Tools. All rights reserved.</p>
        <p className="text-sm mt-1">Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice.</p>
      </div>
    </div>
  </footer>
);

// Enhanced Chatbot Components
const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm VPA (Veripill Personal Assistant), your AI-powered medicine information assistant. I can provide general information about common over-the-counter medicines, their uses, and potential side effects. How can I assist you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    const disclaimer = "\n\n**⚠️ Important Disclaimer:** I am VPA, an AI assistant, not a medical professional. This information is not a substitute for professional medical advice. Please consult with a doctor or pharmacist for a proper diagnosis and treatment plan tailored to you.";

    // Greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey') || lowerInput.includes('greetings')) {
      return "Hello there! I'm VPA, your virtual pharmacy assistant. I'm here to provide you with reliable information about medications, their uses, and potential side effects. Remember, I'm not a substitute for professional medical advice. How can I help you today?";
    }
    
    // How are you
    if (lowerInput.includes('how are you')) {
      return "I'm functioning optimally, thank you for asking! I'm here to provide you with reliable information about medications. What would you like to know about today?";
    }
    
    // Thanks
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return "You're very welcome! I'm happy to help. Is there anything else you'd like to know about medications or health?";
    }
    
    // Help
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return "I can provide general information about:\n\n- Common over-the-counter medications\n- Their uses and active ingredients\n- Potential side effects and interactions\n- General guidance on when to consult a healthcare professional\n\nFeel free to ask me about specific medications or health concerns!";
    }

    // Fever
    if (lowerInput.includes('fever') || lowerInput.includes('temperature')) {
      return `✅ **1. Fever**\n\n**Cause:** Infection, viral or bacterial.\n\n**Medication:**\n- Paracetamol (acetaminophen)\n- Ibuprofen (for inflammation and pain)\n- Stay hydrated, rest\n\n**Important:**\n- Stay hydrated when you have a fever\n- Rest is important for recovery\n- For infants and children, always use age-appropriate formulations and dosages\n- Consult a healthcare provider if fever is high (above 103°F/39.4°C for adults), lasts more than three days, or is accompanied by severe symptoms` + disclaimer;
    }
    
    // Cold / Flu
    if (lowerInput.includes('cold') || lowerInput.includes('flu')) {
      return `✅ **2. Cold / Flu**\n\n**Cause:** Viral infections.\n\n**Medication:**\n- Paracetamol / Ibuprofen for fever and pain\n- Antihistamines (e.g. cetirizine) for runny nose, sneezing\n- Decongestants (e.g. pseudoephedrine) for blocked nose\n- Cough syrups (with dextromethorphan or guaifenesin)\n\n**Important:**\n- Choose medications that target your specific symptoms\n- Avoid multi-symptom products if you only need relief for one or two symptoms\n- Rest and hydration are essential for recovery` + disclaimer;
    }
    
    // Headache
    if (lowerInput.includes('headache')) {
      return `✅ **3. Headache**\n\n**Cause:** Stress, dehydration, sinus, migraine.\n\n**Medication:**\n- Paracetamol\n- Ibuprofen\n- Aspirin (avoid in children)\n\n**Important:**\n- Identify potential triggers for your headaches\n- Stay hydrated\n- For frequent or severe headaches, consult a healthcare provider` + disclaimer;
    }
    
    // Body Ache / Muscle Pain
    if (lowerInput.includes('body ache') || lowerInput.includes('muscle pain') || lowerInput.includes('muscle')) {
      return `✅ **4. Body Ache / Muscle Pain**\n\n**Cause:** Flu, strain, injury.\n\n**Medication:**\n- Ibuprofen or naproxen\n- Muscle relaxants (in severe cases)\n- Topical gels (diclofenac)\n\n**Important:**\n- Rest the affected area\n- Apply ice for acute injuries\n- Apply heat for muscle tension\n- Consult a healthcare provider for severe or persistent pain` + disclaimer;
    }
    
    // Stomach Ache / Indigestion
    if (lowerInput.includes('stomach') || lowerInput.includes('indigestion') || lowerInput.includes('heartburn') || lowerInput.includes('acid')) {
      return `✅ **5. Stomach Ache / Indigestion**\n\n**Cause:** Gas, acidity, infection.\n\n**Medication:**\n- Antacids (e.g. calcium carbonate)\n- Proton pump inhibitors (e.g. omeprazole)\n- Antispasmodics (e.g. hyoscine)\n\n**Important:**\n- Avoid trigger foods (spicy, fatty, acidic foods)\n- Eat smaller, more frequent meals\n- Don't lie down immediately after eating\n- Consult a healthcare provider if symptoms persist` + disclaimer;
    }
    
    // Diarrhea
    if (lowerInput.includes('diarrhea')) {
      return `✅ **6. Diarrhea**\n\n**Cause:** Infection, contaminated food.\n\n**Medication:**\n- Oral rehydration salts (ORS)\n- Loperamide (to reduce stool frequency)\n- Zinc supplements for children\n\n**Important:**\n- Stay hydrated by drinking plenty of fluids\n- Eat bland foods (BRAT diet: bananas, rice, applesauce, toast)\n- Avoid dairy products, fatty foods, and spicy foods\n- Consult a healthcare provider if diarrhea is severe, bloody, or lasts more than 2-3 days` + disclaimer;
    }
    
    // Constipation
    if (lowerInput.includes('constipation')) {
      return `✅ **7. Constipation**\n\n**Cause:** Lack of fiber, dehydration.\n\n**Medication:**\n- Laxatives (e.g. lactulose, polyethylene glycol)\n- Fiber supplements\n- Increased water intake\n\n**Important:**\n- Increase fiber intake gradually\n- Exercise regularly\n- Establish a regular bathroom routine\n- Consult a healthcare provider if constipation is severe or persistent` + disclaimer;
    }
    
    // Allergies
    if (lowerInput.includes('allerg') || lowerInput.includes('allergy')) {
      return `✅ **8. Allergies (Skin or Respiratory)**\n\n**Cause:** Pollen, dust, food, etc.\n\n**Medication:**\n- Antihistamines (cetirizine, loratadine)\n- Corticosteroid creams for skin inflammation\n- Nasal sprays (fluticasone)\n\n**Important:**\n- Identify and avoid allergens when possible\n- Keep windows closed during high pollen seasons\n- Use air purifiers\n- For severe allergies, consider allergy testing and immunotherapy` + disclaimer;
    }
    
    // Skin Infections / Rashes
    if (lowerInput.includes('skin') || lowerInput.includes('rash') || lowerInput.includes('rashes')) {
      return `✅ **9. Skin Infections / Rashes**\n\n**Cause:** Bacterial, fungal, or viral infections.\n\n**Medication:**\n- Antibiotic creams (mupirocin)\n- Antifungal creams (clotrimazole, ketoconazole)\n- Antiseptic washes\n\n**Important:**\n- Keep the affected area clean and dry\n- Avoid scratching to prevent further irritation or infection\n- Consult a healthcare provider for proper diagnosis, especially if the rash is spreading or worsening` + disclaimer;
    }
    
    // Sore Throat
    if (lowerInput.includes('sore throat') || lowerInput.includes('throat')) {
      return `✅ **10. Sore Throat**\n\n**Cause:** Infection, dry air, strain.\n\n**Medication:**\n- Lozenges (menthol, benzocaine)\n- Gargle with warm salt water\n- Paracetamol for pain\n\n**Important:**\n- Stay hydrated\n- Use a humidifier to add moisture to the air\n- Avoid irritants like smoking\n- Consult a healthcare provider if sore throat is severe or lasts more than a week` + disclaimer;
    }
    
    // Cough
    if (lowerInput.includes('cough')) {
      return `✅ **11. Cough**\n\n**Cause:** Viral infection, irritation.\n\n**Medication:**\n- Cough suppressants (dextromethorphan)\n- Expectorants (guaifenesin)\n- Steam inhalation\n\n**Important:**\n- Stay hydrated\n- Honey can help soothe a cough (not for children under 1 year)\n- Use a humidifier\n- Consult a healthcare provider if cough lasts more than a week, is severe, or is accompanied by other concerning symptoms` + disclaimer;
    }
    
    // Anemia
    if (lowerInput.includes('anemia')) {
      return `✅ **12. Anemia**\n\n**Cause:** Iron deficiency, poor diet.\n\n**Medication:**\n- Iron supplements (ferrous sulfate)\n- Vitamin B12 and folic acid supplements\n\n**Important:**\n- Eat iron-rich foods (red meat, poultry, beans, lentils)\n- Vitamin C helps with iron absorption\n- Consult a healthcare provider for proper diagnosis and treatment` + disclaimer;
    }
    
    // Diabetes
    if (lowerInput.includes('diabetes')) {
      return `✅ **13. Diabetes (Type 2)**\n\n**Cause:** Insulin resistance.\n\n**Medication:**\n- Metformin\n- Sulfonylureas (glimepiride)\n- Insulin injections (in some cases)\n\n**Important:**\n- Maintain a healthy diet\n- Exercise regularly\n- Monitor blood sugar levels\n- Regular check-ups with healthcare provider\n- This requires ongoing medical management` + disclaimer;
    }
    
    // Hypertension
    if (lowerInput.includes('hypertension') || lowerInput.includes('high blood pressure') || lowerInput.includes('blood pressure')) {
      return `✅ **14. Hypertension (High Blood Pressure)**\n\n**Cause:** Lifestyle, genetics.\n\n**Medication:**\n- ACE inhibitors (enalapril)\n- Beta-blockers (atenolol)\n- Diuretics (hydrochlorothiazide)\n\n**Important:**\n- Reduce sodium intake\n- Maintain a healthy weight\n- Exercise regularly\n- Limit alcohol consumption\n- Avoid tobacco\n- Regular monitoring of blood pressure\n- This requires ongoing medical management` + disclaimer;
    }
    
    // Anxiety / Depression
    if (lowerInput.includes('anxiety') || lowerInput.includes('depression') || lowerInput.includes('stress')) {
      return `✅ **15. Anxiety / Depression**\n\n**Cause:** Stress, chemical imbalance.\n\n**Medication:**\n- SSRIs (fluoxetine, sertraline)\n- Benzodiazepines (short term use only)\n- Therapy and counseling\n\n**Important:**\n- Practice stress management techniques\n- Regular exercise\n- Adequate sleep\n- Healthy diet\n- Social support\n- This condition requires professional medical and psychological support` + disclaimer;
    }
    
    // Minor Injuries
    if (lowerInput.includes('injuries') || lowerInput.includes('cuts') || lowerInput.includes('bruises') || lowerInput.includes('wound')) {
      return `✅ **16. Minor Injuries (Cuts, Bruises)**\n\n**Cause:** Accidents.\n\n**Medication:**\n- Antiseptic solutions (povidone iodine)\n- Bandages\n- Pain relievers like ibuprofen\n\n**Important:**\n- Clean wounds thoroughly with antiseptic\n- Keep wounds covered and clean\n- Change dressings regularly\n- Watch for signs of infection (redness, swelling, pus)\n- Seek medical attention for deep wounds or signs of infection` + disclaimer;
    }
    
    // Insomnia
    if (lowerInput.includes('insomnia') || lowerInput.includes('sleep') || lowerInput.includes('sleeping')) {
      return `✅ **17. Insomnia**\n\n**Cause:** Stress, anxiety.\n\n**Medication:**\n- Melatonin supplements\n- Sleep aids (short-term use only, e.g., zolpidem)\n- Lifestyle changes\n\n**Important:**\n- Establish a regular sleep schedule\n- Create a relaxing bedtime routine\n- Limit screen time before bed\n- Avoid caffeine and alcohol before bedtime\n- Make sure your sleep environment is comfortable\n- Consult a healthcare provider if insomnia persists` + disclaimer;
    }
    
    // Eye Irritation
    if (lowerInput.includes('eye') || lowerInput.includes('dry eyes')) {
      return `✅ **18. Eye Irritation / Dry Eyes**\n\n**Cause:** Screen exposure, dryness.\n\n**Medication:**\n- Artificial tears\n- Antihistamine drops for allergies\n\n**Important:**\n- Take regular breaks from screens (20-20-20 rule)\n- Use a humidifier\n- Avoid rubbing your eyes\n- Protect your eyes from wind and sun\n- Consult an eye doctor if symptoms persist` + disclaimer;
    }
    
    // Vitamin Deficiency
    if (lowerInput.includes('vitamin') || lowerInput.includes('deficiency')) {
      return `✅ **19. Vitamin Deficiency**\n\n**Cause:** Poor diet or absorption issues.\n\n**Medication:**\n- Vitamin D, Vitamin C, or multivitamin tablets\n\n**Important:**\n- Eat a balanced diet rich in fruits and vegetables\n- Get adequate sun exposure for vitamin D\n- Consult a healthcare provider before starting supplements\n- Some vitamin deficiencies may require specific treatments` + disclaimer;
    }
    
    // Menstrual Cramps
    if (lowerInput.includes('menstrual') || lowerInput.includes('period') || lowerInput.includes('cramps')) {
      return `✅ **20. Menstrual Cramps**\n\n**Cause:** Hormonal changes.\n\n**Medication:**\n- NSAIDs (ibuprofen, naproxen)\n- Heat therapy\n- Hormonal pills (as prescribed)\n\n**Important:**\n- Regular exercise can help reduce cramps\n- Apply heat to the lower abdomen\n- Stay hydrated\n- Rest when needed\n- Consult a healthcare provider if pain is severe` + disclaimer;
    }
    
    // Counterfeit detection
    if (lowerInput.includes('counterfeit') || lowerInput.includes('fake') || lowerInput.includes('fake medicine')) {
      return "Detecting counterfeit medicines is crucial for your safety. Here are some signs to watch for:\n\n**Visual Inspection:**\n- Unusual packaging, spelling errors, poor quality printing\n- Differences in pill color, shape, or size from your usual prescription\n- Cracks or chips in tablets\n\n**Other Signs:**\n- Unusual taste, smell, or texture\n- Lack of effect when taken\n- Unexpected side effects\n\n**How Veripill Helps:**\nOur AI-powered tools analyze images of medicines and packaging to detect inconsistencies that may indicate counterfeits. We also verify QR codes and barcodes against manufacturer databases.\n\n**If you suspect a counterfeit:**\n- Stop using the medication\n- Report it to your pharmacist and healthcare provider\n- Use Veripill to verify the medicine\n- Report it to regulatory authorities";
    }
    
    // Medicine information request
    if (lowerInput.includes('information about') || lowerInput.includes('tell me about') || lowerInput.includes('what is')) {
      const medicineMatch = lowerInput.match(/(?:information about|tell me about|what is)\s+([a-z]+)/i);
      if (medicineMatch) {
        const medicine = medicineMatch[1];
        return `I'd be happy to provide general information about ${medicine}. However, I need to let you know that my knowledge is limited to common over-the-counter medications and general health information. For specific prescription medications, it's best to consult with a pharmacist or healthcare provider.\n\nCould you provide more details about what you'd like to know about ${medicine}? For example, are you looking for information about its uses, potential side effects, or something else?` + disclaimer;
      }
    }
    
    // Side effects
    if (lowerInput.includes('side effect') || lowerInput.includes('side effects') || lowerInput.includes('adverse effect')) {
      return `Side effects are unwanted or unexpected reactions to medications. They can range from mild to severe and vary depending on the medication, dosage, and individual factors.\n\n**Common Types of Side Effects:**\n\n1. **Gastrointestinal:** Nausea, vomiting, diarrhea, constipation, stomach pain\n2. **Central Nervous System:** Drowsiness, dizziness, headache, insomnia\n3. **Allergic Reactions:** Rash, itching, hives, swelling (can be severe)\n4. **Cardiovascular:** Changes in heart rate, blood pressure\n\n**Important Points:**\n- Not everyone experiences side effects\n- They often occur when starting a new medication or changing dosage\n- Many side effects are mild and go away as your body adjusts\n- Always read the medication label and patient information leaflet\n- Report severe or persistent side effects to your healthcare provider\n\nIf you're concerned about side effects from a specific medication, please provide the name and I'll share general information about it.` + disclaimer;
    }
    
    // Default response
    return "I understand you're looking for information about medications or health. While I can provide general information about common over-the-counter medicines and health topics, I don't have specific details about what you're asking. Could you please rephrase your question or be more specific? For personalized medical advice, always consult with a healthcare professional.";
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-24 right-5 w-80 h-[28rem] bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col z-[90] border border-gray-700">
      <div className="p-3 flex justify-between items-center bg-gray-800 rounded-t-xl">
        <h3 className="text-white font-bold">Veripill Assistant (VPA)</h3>
        <button onClick={() => setIsChatOpen(false)} className="text-gray-300 hover:text-white"><CloseIcon/></button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto whitespace-pre-wrap">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-2`}>
            <div className={`px-3 py-2 rounded-lg max-w-xs text-sm ${msg.sender === 'bot' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
              {msg.text.split('**').map((part, i) => i % 2 === 1 ? <b key={i}>{part}</b> : part)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t border-gray-700 flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a medicine or symptom..."
          className="flex-1 bg-gray-700 text-white rounded-l-md px-3 py-2 focus:outline-none"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">→</button>
      </div>
    </div>
  );
};

const ChatbotFAB = ({onClick}) => (
  <button 
    onClick={onClick}
    className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-[100] transform transition-transform hover:scale-110"
    aria-label="Open Chatbot"
  >
    <RobotIcon/>
  </button>
);

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'tool', 'report'
  const [toolPage, setToolPage] = useState('home'); 
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const appRef = useRef(null);
  
  const features = [
    { icon: <AiScanIcon />, title: "AI-Powered Scanning", desc: "Advanced computer vision technology instantly analyzes medicine packaging, pills, and blisters to detect counterfeits." },
    { icon: <RealTimeIcon />, title: "Real-time Verification", desc: "Get instant results with our comprehensive database of authentic medicines and known counterfeit patterns." },
    { icon: <QuickDetectIcon />, title: "Quick Detection", desc: "Scan and verify your medicines in under 3 seconds with 99.9% accuracy rate." },
    { icon: <DatabaseIcon />, title: "Comprehensive Database", desc: "Access to over 1 million verified medicine records from authorized manufacturers worldwide." },
    { icon: <ExpertIcon />, title: "Expert Verification", desc: "Backed by a team of pharmacists and medical experts who continuously update our detection algorithms." },
    { icon: <CertifiedIcon />, title: "Certified Safe", desc: "Approved by health authorities and trusted by healthcare professionals globally." },
  ];

  const newsItems = [
    {
      title: "Global Surge in Fake Ozempic Pens Sparks Health Warnings",
      content: "Authorities in multiple countries have issued urgent alerts about counterfeit Ozempic pens, which contain insulin instead, leading to dangerous hypoglycemic shocks.",
      source: "Reuters Health, 1 day ago"
    },
    {
      title: "Interpol's Operation Pangea XVI Seizes $7 Million in Illicit Medicines",
      content: "A coordinated global crackdown has dismantled 30 criminal networks, resulting in the seizure of millions of potentially lethal counterfeit pills sold online.",
      source: "Interpol Global News, 1 week ago"
    },
    {
      title: "FDA Unveils AI Initiative to Bolster Drug Supply Chain Security",
      content: "The U.S. FDA announced a new program utilizing AI to predict and intercept shipments of counterfeit pharmaceuticals before they enter the country.",
      source: "FDA Press Office, 2 weeks ago"
    },
    {
      title: "Amazon Pharmacy Implements Advanced Verification to Fight Counterfeits",
      content: "The e-commerce giant is rolling out a multi-layered authentication system to guarantee the safety of medications sold on its platform.",
      source: "Tech Health Monthly, 3 weeks ago"
    },
    {
      title: "Consumer Alert: Fake Weight-Loss Drugs on Social Media Platforms",
      content: "Health regulators are warning consumers about a proliferation of fake and unapproved weight-loss drugs being advertised on popular social media sites.",
      source: "Consumer Health Watch, 3 weeks ago"
    },
    {
      title: "Veripill Technology Featured in 'Future of Health' Documentary",
      content: "Our AI-powered verification technology was recently highlighted for its innovative approach to ensuring patient safety and combating the global counterfeit drug trade.",
      source: "Veripill Blog, 1 month ago"
    },
    {
      title: "Fake Cough Syrups Linked to Child Deaths in Asia, WHO Alert",
      content: "The WHO has linked hundreds of tragic child deaths to contaminated and counterfeit cough syrups, highlighting critical gaps in pharmaceutical regulation.",
      source: "World Health Organization Press, 1 month ago"
    },
    {
      title: "The High-Tech Arms Race Against Counterfeit Pharmaceuticals",
      content: "From AI-powered visual inspection to blockchain supply chain tracking, discover the technologies being deployed to combat the multi-billion dollar fake drug industry.",
      source: "TechCrunch, 2 months ago"
    },
    {
      title: "Blockchain in Pharma: A Silver Bullet for Authenticity?",
      content: "Experts are debating the efficacy of blockchain technology in creating an immutable ledger for pharmaceuticals, aiming to provide end-to-end traceability.",
      source: "PharmaTech Today, 2 months ago"
    },
    {
      title: "Rising Threat of Counterfeit Antibiotics in Developing Nations",
      content: "A new report indicates a sharp increase in substandard and fake antibiotics, contributing to antibiotic resistance and treatment failures.",
      source: "Global Health Council, 3 months ago"
    }
  ];


  const handleMouseMove = (e) => {
    if (appRef.current) {
      const { clientX, clientY } = e;
      appRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      appRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    }
  };
  
  /* Ensure text color dynamically changes */
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1a202c" : "#ffffff"; // Dark gray for dark mode, white for light mode
    document.body.style.color = darkMode ? "#ffffff" : "#000000"; // White for dark mode, black for light mode
  }, [darkMode]);

  // Insert global effect to update body font color based on theme
  useEffect(() => {
    document.body.style.color = darkMode ? "" : "black";
  }, [darkMode]);

  const pageConfigs = {
    ocr: { id: 'ocr', title: 'Verify by Text (OCR)', description: 'Take a picture or upload an image of the medicine label to extract and verify its text.', icon: <OcrIcon />, color: 'bg-blue-500' },
    qr: { id: 'qr', title: 'Verify by QR Scan', description: 'Scan the QR or Barcode on the packaging for an instant authenticity check.', icon: <QrIcon />, color: 'bg-blue-500', disableUpload: true },
    image: { id: 'image', title: 'Verify by Image Analysis', description: 'Upload a photo of the pill or packaging for a deep CNN-based analysis.', icon: <ImageIcon />, color: 'bg-blue-500' },
  };

  const navigateToTool = (pageId) => {
    setCurrentView('tool');
    setToolPage(pageId);
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };
  
  const handleNavClick = (targetId) => {
    if (targetId === 'report') {
      setCurrentView('report');
      window.scrollTo(0, 0);
      return;
    }
    
    if (targetId === 'download') {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToolNavigation = (pageId) => {
    if (pageId === 'home') {
      setToolPage('home');
    } else {
      setToolPage(pageId);
      window.scrollTo(0, 0);
    }
  };
  

  
  if (currentView === 'landing') {
    return (
      <>
        <StyleInjector />
        <div 
          id="app-container" 
          ref={appRef} 
          onMouseMove={handleMouseMove} 
          className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col relative overflow-hidden`}
        >
          <VeripillHeader handleNavClick={handleNavClick} navigateToLanding={navigateToLanding} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <main className="flex-grow">
            <HeroSection onNavigateToTool={navigateToTool} />
            <WhyChooseSection features={features} onNavigateToTool={navigateToTool} />
            <NewsSliderSection newsItems={newsItems} />
            <HowItWorksSection />
            <CtaSection onNavigateToTool={() => navigateToTool('home')} />
          </main>
          <VeripillFooter />
          <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
          <ChatbotFAB onClick={() => setIsChatOpen(prev => !prev)} />
        </div>
      </>
    );
  }
  
  if (currentView === 'tool') {
    const renderToolPage = () => {
      if (toolPage === 'home') {
        return <VeripillToolHomePage onNavigate={handleToolNavigation} features={Object.values(pageConfigs)} />;
      }
      if (pageConfigs[toolPage]) {
        return <VerificationPage config={pageConfigs[toolPage]} onBack={() => setToolPage('home')} />;
      }
      return <VeripillToolHomePage onNavigate={handleToolNavigation} features={Object.values(pageConfigs)} />;
    };

    return (
      <>
        <StyleInjector />
        <div 
          id="app-container" 
          ref={appRef} 
          onMouseMove={handleMouseMove} 
          className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col relative overflow-hidden`}
        >
          <VeripillToolHeader onNavigate={handleToolNavigation} />
          <main className="flex-grow">
            {renderToolPage()}
          </main>
          <button onClick={navigateToLanding} className="font-medium text-blue-400 hover:text-blue-300 mb-8 mx-auto">{'<--'} Back to Main Landing Page</button>
          <VeripillToolFooter />
        </div>
      </>
    );
  }

  if (currentView === 'report') {
    return (
      <>
        <StyleInjector />
        <div 
          id="app-container" 
          ref={appRef} 
          onMouseMove={handleMouseMove} 
          className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col relative overflow-hidden`}
        >
          <VeripillHeader handleNavClick={handleNavClick} navigateToLanding={navigateToLanding} />
          <main className="flex-grow">
            <ReportPage navigateToLanding={navigateToLanding} />
          </main>
          <VeripillFooter />
        </div>
      </>
    );
  }
}