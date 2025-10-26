import React from 'react';

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

export default VeripillToolFooter;
