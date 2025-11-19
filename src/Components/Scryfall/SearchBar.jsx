import React from "react";
import { useState } from "react";

const SearchBar = ({ query, setQuery, handleSearch}) => {
    
    

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-lg">
        ✨ Scryfall Search ✨
      </h1>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto mb-8 flex items-center gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Magic cards..."
          className="flex-1 p-3 bg-gray-900 border border-purple-500 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:shadow-[0_0_10px_#9333ea]"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
