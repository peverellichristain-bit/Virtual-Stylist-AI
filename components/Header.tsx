import React from 'react';

interface HeaderProps {
  onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-center items-center relative">
        <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Virtual Stylist AI
            </h1>
            <p className="text-center text-gray-500 mt-1">Your personal AI fashion consultant</p>
        </div>
        <button
          onClick={onOpenProfile}
          className="absolute right-4 md:right-8 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors shadow-sm whitespace-nowrap"
          aria-label="Open user profile"
        >
          My Profile
        </button>
      </div>
    </header>
  );
};

export default Header;
