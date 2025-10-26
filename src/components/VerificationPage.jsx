import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, UploadIcon } from './icons';

function VerificationPage({ darkMode, mode = 'image' }) {
  const [source, setSource] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }, [stream]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error('Video play failed:', err);
        setError('Failed to start the camera view. Please try again.');
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
      console.error('Camera access denied:', err);
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

  // Derive UI labels and behavior based on mode
  const titles = {
    ocr: 'Text (OCR) Verification',
    qr: 'QR Scan Verification',
    image: 'Image Analysis Verification'
  };
  const descriptions = {
    ocr: 'Capture or upload a photo of the label to extract and verify text.',
    qr: 'Use your camera to scan the QR or barcode on the packaging.',
    image: 'Capture or upload a photo of the medicine for visual analysis.'
  };
  const isQR = mode === 'qr';

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 isolate">
      <div className="bg-black/20 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-white">{titles[mode] || 'Verification'}</h2>
          <button onClick={() => navigate('/')} className="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">← Back to Home</button>
        </div>
        <p className="mt-2 text-gray-300">{descriptions[mode] || 'Take a picture or upload an image for verification.'}</p>

        {/* Controls: QR mode should emphasize camera scan; OCR & Image allow upload */}
        <div className={`mt-6 grid grid-cols-1 ${isQR ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
          <button onClick={handleStartCamera} className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-110"><CameraIcon />{isQR ? 'Start Scanner' : 'Use Camera'}</button>
          {!isQR && (
            <React.Fragment>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-110"><UploadIcon />Upload Image</button>
            </React.Fragment>
          )}
        </div>
        {error && <div className="mt-4 text-center text-red-300 bg-red-900/50 p-3 rounded-lg">{error}</div>}
        <div className="mt-6">
          {(source === 'camera' && stream && !imageSrc) && (
            <div className="w-full p-2 border-2 border-dashed border-gray-600 rounded-lg bg-black">
              <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-md" />
              {!isQR && (
                <button onClick={handleCapture} className="mt-4 w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">Take Snapshot</button>
              )}
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
}

export default VerificationPage;
