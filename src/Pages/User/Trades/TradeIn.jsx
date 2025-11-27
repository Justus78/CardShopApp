import React, { useState } from "react";
import Navbar from "../../../Components/User/Navbar";
import ScryfallSearch from "../../../Components/User/ScryfallSearch";
import SearchBar from "../../../Components/Scryfall/SearchBar";

const TradeIn = () => {
  

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6">

        <Navbar />
        <ScryfallSearch />
      </div>
    </>
      
  );
};

export default TradeIn;
