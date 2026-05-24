import React, { useState } from "react";
import Navbar from "../../../Components/User/Navbar";
import TradeInDashboard from "../../../Components/User/TradeIn/TradeInDashboard";
import Footer from '../../../Components/User/Footer'

const TradeInMain = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6">
          <TradeInDashboard />
          <Footer />
        </div>
    </>
      
  );
};

export default TradeInMain;
