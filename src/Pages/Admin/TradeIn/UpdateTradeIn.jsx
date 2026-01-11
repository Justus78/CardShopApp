import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getTradeInByIdAdmin,
  submitFinalOfferFromAdmin,
  updateTradeInItemFinalValue,
} from "../../../Services/TradeInService";

import Navbar from "../../../Components/Admin/Navbar";
import TableHeader from "../../../Components/Admin/TableHeader";

import TradeInItemListWithPreview from "../../../Components/User/TradeInItemListWithPreview";
import { TradeInStatus } from "../../../Context/Constants/TradeInStatus";
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../../Context/Constants/TradeInStatusColors";

export const UpdateTradeIn = () => {
  const { id } = useParams();

  const [trade, setTrade] = useState(null);
  const [finalValues, setFinalValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------
  // Fetch trade on load
  // -----------------------------------
  useEffect(() => {
    const loadTrade = async () => {
      try {
        setLoading(true);
        const res = await getTradeInByIdAdmin(id);
        setTrade(res);
      } catch (err) {
        setError(err.message || "Failed to load trade.");
      } finally {
        setLoading(false);
      }
    };

    loadTrade();
  }, [id]);

  // -----------------------------------
  // Map initial final values for inputs
  // -----------------------------------
  useEffect(() => {
    if (!trade) return;

    const map = {};
    trade.items.forEach(i => {
      map[i.id] = i.finalUnitValue ?? "";
    });

    setFinalValues(map);
  }, [trade]);

  // -----------------------------------
  // Save individual item final value
  // -----------------------------------
  const handleFinalValueBlur = async (itemId) => {
    const raw = finalValues[itemId];

    if (raw === "") return;

    const value = parseFloat(raw);
    if (isNaN(value) || value < 0) return;

    try {
      await updateTradeInItemFinalValue(itemId, value);

      // optimistic UI update
      setTrade(prev => ({
        ...prev,
        items: prev.items.map(i =>
          i.id === itemId ? { ...i, finalUnitValue: value } : i
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------
  // Submit final offer
  // -----------------------------------
  const submitFinalOffer = async () => {
    try {
      setLoading(true);
      await submitFinalOfferFromAdmin(trade.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // Status helpers
  // -----------------------------------
  const isOfferSent = trade?.status === TradeInStatus.OfferSent;

  const hasUnsetPrices =
    trade?.items?.some(i => i.finalUnitValue == null);

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-900 text-white pt-28">
        <div className="max-w-6xl mx-auto p-6">
          <TableHeader title="Trade In Review" />

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {trade && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold neon-text mb-4">
                Trade-In Details
              </h2>

              <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2 mb-6">
                <p><strong>User:</strong> {trade.userEmail}</p>
                <p><strong>ID:</strong> {trade.id}</p>
                <p>
                  <strong>Started:</strong>{" "}
                  {new Date(trade.createdAt).toLocaleString()}
                </p>

                <p className={`${TradeInStatusColors[trade.status]} mt-2`}>
                  <strong>Status:</strong>{" "}
                  {TradeInStatusLabels[trade.status]}
                </p>
              </div>

              {/* 🔥 Reusable Component Here */}
              <TradeInItemListWithPreview
                items={trade.items}
                renderItemRightExtra={(item) => (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={finalValues[item.id]}
                    disabled={isOfferSent}
                    onChange={(e) =>
                      setFinalValues(prev => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    onBlur={() => handleFinalValueBlur(item.id)}
                    className={`w-24 px-2 py-1 rounded ml-4
                      ${isOfferSent
                        ? "bg-black border-gray-600 text-gray-500 cursor-not-allowed"
                        : "bg-black border-cyan-400 text-cyan-200"}`}
                  />
                )}
              >
                {/* 🔑 Action Slot Buttons */}
                <button
                  disabled={isOfferSent || hasUnsetPrices || loading}
                  onClick={submitFinalOffer}
                  className={`px-6 py-3 font-bold rounded-lg neon-button
                    ${isOfferSent
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600"}
                    disabled:opacity-50`}
                >
                  {isOfferSent ? "Offer Already Sent" : "Submit Final Offer"}
                </button>
              </TradeInItemListWithPreview>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateTradeIn;
