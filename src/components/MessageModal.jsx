import React from 'react';

const MessageModal = ({ message, type, onClose }) => {
  if (!message) return null;

  let bgColorClass = 'bg-blue-500'; // Default for info
  if (type === 'success') {
    bgColorClass = 'bg-green-500';
  } else if (type === 'error') {
    bgColorClass = 'bg-red-500';
  } else if (type === 'warning') {
    bgColorClass = 'bg-yellow-500';
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className={`relative ${bgColorClass} text-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center transform transition-all duration-300 ease-in-out scale-100`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl font-bold leading-none hover:text-gray-200 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <p className="text-lg font-semibold mb-2">{message}</p>
        <p className="text-sm">Click 'X' to close.</p>
      </div>
    </div>
  );
};

export default MessageModal;
