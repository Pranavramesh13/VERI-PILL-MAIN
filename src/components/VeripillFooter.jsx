import React from 'react';
import { LogoIcon } from './icons';

const VeripillFooter = () => (
  <footer className="bg-black isolate">
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
        <div>
          <div className="flex items-center space-x-2 mb-4"><LogoIcon /><h1 className="text-xl font-bold text-gray-100">Veripill</h1></div>
          <p className="text-sm">Protecting your health with AI-powered medicine authentication. Trusted by healthcare professionals worldwide.</p>
          <div className="flex space-x-4 mt-4">
            <button type="button" className="hover:text-white underline-offset-2 hover:underline">FB</button>
            <button type="button" className="hover:text-white underline-offset-2 hover:underline">TW</button>
            <button type="button" className="hover:text-white underline-offset-2 hover:underline">IN</button>
          </div>
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
            <li><button type="button" className="hover:text-white">Help Center</button></li>
            <li><button type="button" className="hover:text-white">Contact Us</button></li>
            <li><button type="button" className="hover:text-white">Privacy Policy</button></li>
            <li><button type="button" className="hover:text-white">Terms of Service</button></li>
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

export default VeripillFooter;
