import React from 'react';

const SearchBar = () => {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="search"
          placeholder="Search routes..."
          className="w-full p-3 rounded-full border-2 border-gray-200 pl-12 pr-4 outline-none focus:border-yellow-400"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">not found? Sort now</p>
    </div>
  );
}

export default SearchBar;