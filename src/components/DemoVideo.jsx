import React, { useEffect, useState } from 'react';
import { UploadIcon } from './icons';

const DemoVideo = () => {
  const [scanStep, setScanStep] = useState(0);
  const [isCounterfeit, setIsCounterfeit] = useState(false);

  const medicineImageUrl = "https://z-cdn-media.chatglm.cn/files/e7f3b009-c74c-482c-8360-00ff758a8e7a_images.jpeg?auth_key=1789554089-45ecb80173c947669c84d2aec379c3c0-0-f32a26380868ab2b45e40abe76ea99f6";
  const qrCodeImageUrl = "https://z-cdn-media.chatglm.cn/files/53592440-d3a8-4183-8e65-ab522fb45a79_My_QR_Code_1-1024.jpeg?auth_key=1789554089-7ba4e12803914c749d1d0725c45e16e1-0-42156a9874c42f3ad82162f4bb075203";

  useEffect(() => {
    const timer = setInterval(() => {
      setScanStep(prev => (prev + 1) % 6);
      setIsCounterfeit((prev) => (Math.random() > 0.5));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 bg-gray-900/60 rounded-xl border border-gray-700 p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Veripill in Action</h3>
      <p>Note:Mainly focused for new tablet strip</p>
      <div className="relative rounded-lg overflow-hidden bg-black">
        <div className="demo-container">
          <div className="qr-demo">
            {scanStep === 0 && (
              <div className="qr-step">
                <h3>Step 1: Upload Medicine Strip</h3>
                <p>Take a photo or upload an image of your medicine strip</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-48 h-32 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img src={medicineImageUrl} alt="Medicine Strip" className="w-full h-full object-contain" />
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                        <UploadIcon /> Upload Medicine Strip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {scanStep === 1 && (
              <div className="qr-step">
                <h3>Step 2: Analyzing Medicine</h3>
                <p>Veripill is analyzing the medicine strip</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img src={medicineImageUrl} alt="Medicine Strip" className="w-48 h-32 object-contain mb-4" />
                      <div className="progress-container"><div className="progress-bar"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {scanStep === 2 && (
              <div className="qr-step">
                <h3>Result:</h3>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img src={medicineImageUrl} alt="Medicine Strip" className="w-48 h-32 object-contain mb-4" />
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

            {scanStep === 3 && (
              <div className="qr-step">
                <h3>Step 4: Locate QR Code</h3>
                <p>Find the QR code on your medicine packaging</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <img src={qrCodeImageUrl} alt="QR Code" className="w-full h-full object-contain p-4" />
                  </div>
                </div>
              </div>
            )}

            {scanStep === 4 && (
              <div className="qr-step">
                <h3>Step 5: Scan with Veripill</h3>
                <p>Open the app and scan the QR code</p>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <img src={qrCodeImageUrl} alt="QR Code" className="w-full h-full object-contain p-4" />
                    <div className="scan-line"></div>
                  </div>
                </div>
              </div>
            )}

            {scanStep === 5 && (
              <div className="qr-step">
                <h3>Result:</h3>
                <div className="qr-animation">
                  <div className="qr-frame">
                    <img src={qrCodeImageUrl} alt="QR Code" className="w-full h-full object-contain p-4" />
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
        <p className="text-gray-300">Veripill uses advanced AI to analyze medicines and detect counterfeits. See how easy it is to verify your medications in seconds!</p>
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

export default DemoVideo;
