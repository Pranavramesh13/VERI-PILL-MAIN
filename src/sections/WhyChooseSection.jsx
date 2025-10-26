import React from 'react';
import { AiScanIcon, RealTimeIcon, QuickDetectIcon, DatabaseIcon, ExpertIcon, CertifiedIcon } from '../components/icons';

const defaultFeatures = [
  { icon: <AiScanIcon />, title: "AI-Powered Scanning", desc: "Advanced computer vision technology instantly analyzes medicine packaging, pills, and blisters to detect counterfeits." },
  { icon: <RealTimeIcon />, title: "Real-time Verification", desc: "Get instant results with our comprehensive database of authentic medicines and known counterfeit patterns." },
  { icon: <QuickDetectIcon />, title: "Quick Detection", desc: "Scan and verify your medicines in under 3 seconds with 99.9% accuracy rate." },
  { icon: <DatabaseIcon />, title: "Comprehensive Database", desc: "Access to over 1 million verified medicine records from authorized manufacturers worldwide." },
  { icon: <ExpertIcon />, title: "Expert Verification", desc: "Backed by a team of pharmacists and medical experts who continuously update our detection algorithms." },
  { icon: <CertifiedIcon />, title: "Certified Safe", desc: "Approved by health authorities and trusted by healthcare professionals globally." },
];

const WhyChooseSection = ({ features = defaultFeatures }) => {
  return (
    <section id="features" className="py-20 bg-black/50 isolate">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl font-extrabold text-white">Why Choose Veripill?</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          Advanced technology meets healthcare expertise to deliver the most reliable medicine authentication platform available today.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-900/60 p-6 rounded-xl border border-gray-700 text-center flex flex-col items-center transition-all duration-300 hover:border-blue-400/50 hover:bg-gray-800 hover:-translate-y-2 relative overflow-hidden">
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

export default WhyChooseSection;
