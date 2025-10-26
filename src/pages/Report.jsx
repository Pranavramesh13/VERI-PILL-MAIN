import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon } from '../components/icons';

function Report({ darkMode }) {
  const navigate = useNavigate();
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
          <div className="mt-8">
            <button onClick={() => navigate('/')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">← Back to Home</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white text-center">Report Suspected Medicine</h2>
          <p className="mt-2 text-gray-300 text-center mb-8">Please upload an image of the suspected counterfeit medicine below.</p>
          <div className="mb-6 text-right">
            <button type="button" onClick={() => navigate('/')} className="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">← Back to Home</button>
          </div>
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
}

export default Report;
