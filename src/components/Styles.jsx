import { useEffect } from 'react';

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
  }
  .authentic-text {
    font-weight: 900;
    color: #00ff00;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.9), 0 0 20px rgba(0, 255, 0, 0.7);
  }
  .demo-container { position: relative; width: 100%; height: 500px; background-color: #000; border-radius: 0.5rem; overflow: hidden; }
  .qr-demo { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #000; color: white; padding: 2rem; text-align: center; }
  .qr-step { margin-bottom: 2rem; }
  .qr-step h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #3b82f6; }
  .qr-step p { max-width: 600px; margin: 0 auto; color: #d1d5db; }
  .qr-animation { position: relative; width: 300px; height: 300px; margin: 2rem auto; background-color: #000; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
  .qr-frame { position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 2px dashed #3b82f6; border-radius: 0.5rem; }
  .qr-code { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150px; height: 150px; background-color: white; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; }
  .qr-code::before { content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; background-image: linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%); background-size: 15px 15px; background-position: 0 0, 0 7.5px, 7.5px -7.5px, -7.5px 0px; }
  .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, transparent, #3b82f6, transparent); animation: scan 2s linear infinite; }
  @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
  .result-display { position: absolute; bottom: 0; left: 0; width: 100%; padding: 1rem; text-align: center; font-weight: bold; font-size: 1.2rem; }
  .counterfeit-result { background-color: rgba(239, 68, 68, 0.9); color: white; }
  .authentic-result { background-color: rgba(16, 185, 129, 0.9); color: white; }
  .progress-container { width: 80%; height: 8px; background-color: #374151; border-radius: 4px; margin: 1rem auto; overflow: hidden; }
  .progress-bar { height: 100%; background-color: #3b82f6; border-radius: 4px; animation: progress 2s linear infinite; }
  @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
  .medicine-image { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 0.5rem; }
`;

const StyleInjector = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customStyles;
    document.head.appendChild(style);

    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#d1d5db';
    document.body.style.fontFamily = 'sans-serif';

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

export default StyleInjector;
