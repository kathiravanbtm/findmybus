import React from 'react';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🚌</span>
        <h1 className="text-lg font-medium text-gray-800">Neram Vanthuchi</h1>
      </div>
      <button className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
        <span className="text-xl">👤</span>
      </button>
    </header>
  );
}

export default Header;