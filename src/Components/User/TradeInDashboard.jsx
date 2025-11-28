import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import Navbar from "../../Components/User/Navbar";

// Mock fetch functions (replace with your API calls)
const fetchCurrentTradeIn = async (userId) => {
  // Replace with real API call
  return await fetch(`/api/tradein/current/${userId}`).then(res => res.json());
};

const fetchPastTradeIns = async (userId) => {
  // Replace with real API call
  return await fetch(`/api/tradein/past/${userId}`).then(res => res.json());
};

const TradeInDashboard = () => {
  const { user } = useContext(DataContext);
  const [currentTradeIn, setCurrentTradeIn] = useState(null);
  const [pastTradeIns, setPastTradeIns] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchCurrentTradeIn(user.id).then(setCurrentTradeIn);
      fetchPastTradeIns(user.id).then(setPastTradeIns);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold neon-text mb-8 text-center">
          Trade-In Dashboard
        </h1>

        {/* Current Trade-In */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Current Trade-In
          </h2>

          {currentTradeIn ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2">
              <p className="text-lg mb-2">
                <span className="font-bold">Trade-In ID:</span> {currentTradeIn.id}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Items:</span>{" "}
                {currentTradeIn.items.map(item => item.name).join(", ")}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Status:</span> {currentTradeIn.status}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You have no active trade-ins.</p>
              <a href="#">
                <button className="px-6 py-3 neon-button font-bold rounded-lg">
                    Start a Trade-In
                </button>
              </a>
            </div>
          )}
        </section>

        {/* Past Trade-Ins */}
        <section>
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Past Trade-Ins
          </h2>

          {pastTradeIns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTradeIns.map(trade => (
                <div
                  key={trade.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-neon border-neon border-2"
                >
                  <p className="text-lg mb-1">
                    <span className="font-bold">ID:</span> {trade.id}
                  </p>
                  <p className="text-lg mb-1">
                    <span className="font-bold">Items:</span>{" "}
                    {trade.items.map(item => item.name).join(", ")}
                  </p>
                  <p className="text-lg">
                    <span className="font-bold">Status:</span> {trade.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>You have no past trade-ins.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default TradeInDashboard;
