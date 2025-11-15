import React from 'react';

const Capture: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Snap to Buy ✨</h2>
      <p className="text-gray-400 mb-8">Take a photo and AI will find matching items nearby</p>
      <div className="bg-[#1a1a1a] rounded-lg p-20 flex flex-col items-center justify-center border border-dashed border-gray-600">
        <div className="mb-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        </div>
        <p className="text-gray-400">Drop an image or start your webcam</p>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
          <span>Use Webcam</span>
        </button>
        <button className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          <span>Upload Image</span>
        </button>
      </div>
    </div>
  );
};

export default Capture;
