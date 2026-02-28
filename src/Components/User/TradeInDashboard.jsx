import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TableHeader from "../Admin/TableHeader";
import ConfirmModal from "../ConfirmModal";
import TradeInItemListWithPreview from "./TradeInItemListWithPreview";
import { TradeInStatusLabels } from "../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../Context/Constants/TradeInStatusColors";
import { TradeInStatus } from "../../Context/Constants/TradeInStatus";
import { div, option } from "framer-motion/client";


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
  const [sortOption, setSortOption] = useState(null);

  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState({
  isOpen: false,
  type: null,
  tradeId: null,
});

toast.error
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

  // useEffect(() => {
  //   let filtered = [...pastTradeIns];

  //   if (sortOption !== null) {
  //     filtered = filtered.filter(t => t.status === sortOption);
  //   }

  //   setFilteredTrades(filtered);
  // }, [sortOption, pastTradeIns]);

  const filteredTrades = useMemo(() => {
  if (sortOption === null) return pastTradeIns;
  return pastTradeIns.filter(t => t.status === sortOption);
}, [pastTradeIns, sortOption]);


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

  // helper methods for confirm modal
  const openSubmitConfirm = (id) => {
  setConfirmModal({
    isOpen: true,
    type: "submit",
    tradeId: id,
  });
};

const openCancelConfirm = (id) => {
  setConfirmModal({
    isOpen: true,
    type: "cancel",
    tradeId: id,
  });
};

const closeConfirmModal = () => {
  setConfirmModal({
    isOpen: false,
    type: null,
    tradeId: null,
  });
};

const handleConfirm = async () => {
  const { type, tradeId } = confirmModal;

  if (type === "submit")
    await submitTrade(tradeId);

  if (type === "cancel")
    await cancelTrade(tradeId);

  closeConfirmModal();
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

                {currentTradeIn.items.length > 0 ?
                  <div className="flex gap-4">
                    <button
                      onClick={() => openCancelConfirm(currentTradeIn.id)}
                      className="px-6 py-3 bg-red-700 neon-button font-bold rounded-lg"
                    >
                      Cancel Trade In
                    </button>

                    <button
                      onClick={() => openSubmitConfirm(currentTradeIn.id)}
                      className="px-6 py-3 bg-green-600 neon-button font-bold rounded-lg"
                    >
                      Submit Trade In
                    </button> 
                  </div> : ""
                }
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
          {/** filter logic */}
          <div className="flex justify-between mb-4">
            <select 
              value={sortOption ?? ""}
              onChange={(e) => setSortOption(e.target.value === "" ? null : Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option className="text-black" value="">All</option>
              <option className="text-black" value={0}>Draft</option>
              <option className="text-black" value={1}>Submitted</option>
              <option className="text-black" value={2}>Estimated</option>
              <option className="text-black" value={3}>Shipped</option>
              <option className="text-black" value={4}>Received</option>
              <option className="text-black" value={5}>Under Review</option>
              <option className="text-black" value={6}>Offer Sent</option>
              <option className="text-black" value={7}>Accepted</option>
              <option className="text-black" value={8}>Credited</option>
              <option className="text-black" value={9}>Declined</option>
              <option className="text-black" value={10}>Auto Completed</option>
              <option className="text-black" value={11}>Returned</option>
            </select>
          </div>

          {filteredTrades.length != 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrades.map(trade => (
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
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={
          confirmModal.type === "submit"
            ? "Submit Trade-In"
            : "Cancel Trade-In"
        }
        message={
          confirmModal.type === "submit"
            ? "Are you sure you want to submit this trade-in? You won't be able to modify it afterward."
            : "Are you sure you want to cancel this trade-in?"
        }
        confirmText="Yes"
        cancelText="No"
        confirmColor={
          confirmModal.type === "submit"
            ? "bg-green-600"
            : "bg-red-600"
        }
        onConfirm={handleConfirm}
        onCancel={closeConfirmModal}
      />
    </div>
  );
};

export default TradeInDashboard;
