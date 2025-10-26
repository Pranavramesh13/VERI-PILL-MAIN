import React from 'react';
import { RobotIcon } from './icons';

const ChatbotFAB = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-[100] transform transition-transform hover:scale-110"
    aria-label="Open Chatbot"
  >
    <RobotIcon/>
  </button>
);

export default ChatbotFAB;
