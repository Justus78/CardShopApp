import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TableHeader from "../Admin/TableHeader";
import TradeInItemListWithPreview from "./TradeInItemListWithPreview";
import { TradeInStatusLabels } from "../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../Context/Constants/TradeInStatusColors";
import { TradeInStatus } from "../../Context/Constants/TradeInStatus";

import {
  getUserTradeIns,
  getOrCreateDraftTradeIn,
  submitTradeIn,
  cancelTradeIn,
} from "../../Services/TradeInService";

/**
 * Dashboard responsibilities:
 * - Fetch data
 * - Decide what to show
 * - Pass handlers DOWN to child components
 *
 * No rendering of individual items here anymore.
 */
const TradeInDashboard = () => {
  const [currentTradeIn, setCurrentTradeIn] = useState(null);
  const [pastTradeIns, setPastTradeIns] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Initial fetch
  useEffect(() => {
    refreshTrades();
  }, []);

  const refreshTrades = async () => {
    try {
      setLoading(true);
      const trades = await getUserTradeIns();

      setCurrentTradeIn(trades.find(t => t.status === TradeInStatus.Draft) || null);
      setPastTradeIns(trades.filter(t => t.status !== TradeInStatus.Draft));
    } catch {
      toast.error("Failed to load trade-ins.");
    } finally {
      setLoading(false);
    }
  };

  const startTradeDraft = async () => {
    try {
      setLoading(true);
      const trade = await getOrCreateDraftTradeIn();
      setCurrentTradeIn(trade);
    } catch {
      toast.error("Failed to start trade-in.");
    } finally {
      setLoading(false);
    }
  };

  const submitTrade = async (id) => {
    try {
      setLoading(true);
      await submitTradeIn(id);
      toast.success("Trade submitted!");
      refreshTrades();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelTrade = async (id) => {
    try {
      setLoading(true);
      await cancelTradeIn(id);
      refreshTrades();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-28">
      <div className="max-w-6xl mx-auto p-6">
        <TableHeader title="Trade In Dashboard" />

        {/* CURRENT TRADE */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Current Trade-In
          </h2>

          {currentTradeIn ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2">
              <p className="mb-2">
                <strong>ID:</strong> {currentTradeIn.id}
              </p>

              <p className={`mb-4 ${TradeInStatusColors[currentTradeIn.status]}`}>
                <strong>Status:</strong>{" "}
                {TradeInStatusLabels[currentTradeIn.status]}
              </p>

              <TradeInItemListWithPreview items={currentTradeIn.items}>
                <button
                  onClick={() => navigate("/userAddTrade")}
                  className="px-6 py-3 bg-blue-600 neon-button font-bold rounded-lg"
                >
                  Add Cards
                </button>

                <button
                  onClick={() => cancelTrade(currentTradeIn.id)}
                  className="px-6 py-3 bg-red-700 neon-button font-bold rounded-lg"
                >
                  Cancel Trade In
                </button>

                <button
                  onClick={() => submitTrade(currentTradeIn.id)}
                  className="px-6 py-3 bg-green-600 neon-button font-bold rounded-lg"
                >
                  Submit Trade In
                </button>
              </TradeInItemListWithPreview>

            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You have no active trade-ins.</p>
              <button
                onClick={startTradeDraft}
                className="px-6 py-3 neon-button font-bold rounded-lg"
              >
                Start a Trade-In
              </button>
            </div>
          )}
        </section>

        {/* PAST TRADES */}
        <section>
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Past Trade-Ins
          </h2>

          {pastTradeIns.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTradeIns.map(trade => (
                <div
                  key={trade.id}
                  className="bg-gray-800 p-4 rounded-lg border-neon border-2"
                >
                  <p><strong>Trade Id:</strong> {trade.id}</p>
                  <p className={TradeInStatusColors[trade.status]}>
                    Status: {TradeInStatusLabels[trade.status]}
                  </p>

                  <button
                    onClick={() => navigate(`/userViewTrade/${trade.id}`)}
                    className="px-6 py-3 neon-button font-bold rounded-lg"
                  >
                    Review
                  </button>
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
