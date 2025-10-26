import React from 'react';
import { OcrIcon, QrIcon, ImageIcon } from './icons';

const features = [
  { id: 'ocr', icon: <OcrIcon />, title: 'Verify by Text (OCR)', description: 'Take a picture or upload an image of the medicine label to extract and verify its text.', color: 'bg-blue-500' },
  { id: 'qr', icon: <QrIcon />, title: 'Verify by QR Scan', description: 'Scan the QR or Barcode on the packaging for an instant authenticity check.', color: 'bg-blue-500' },
  { id: 'image', icon: <ImageIcon />, title: 'Verify by Image Analysis', description: 'Upload a photo of the pill or packaging for a deep CNN-based analysis.', color: 'bg-blue-500' },
];

const VeripillToolHomePage = ({ onNavigate }) => (
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

export default VeripillToolHomePage;
