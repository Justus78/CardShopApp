import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TableHeader from "../Admin/TableHeader";
import ConfirmModal from "../ConfirmModal";
import TradeInItemListWithPreview from "./TradeInItemListWithPreview";
import { TradeInStatusLabels } from "../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../Context/Constants/TradeInStatusColors";
import { TradeInStatus } from "../../Context/Constants/TradeInStatus";
import { updateDraftItemQuantity, removeDraftItem } from "../../Services/TradeInService";
import { TradeInStatusIcons } from "../../Constants/enums";

import {
  getUserTradeIns,
  getOrCreateDraftTradeIn,
  submitTradeIn,
  cancelTradeIn,
} from "../../Services/TradeInService";

const TradeInDashboard = () => {
  const [currentTradeIn, setCurrentTradeIn] = useState(null);
  const [pastTradeIns, setPastTradeIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortOption, setSortOption] = useState("newest");

  const navigate = useNavigate();

  // ✅ store full trade instead of just id
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    trade: null,
  });

  const tradeSteps = [
    { status: 1, label: "Submitted" },
    { status: 3, label: "Shipped" },
    { status: 4, label: "Received" },
    { status: 8, label: "Completed" },
  ];

  const getProgressPercent = (status) => {
    let currentIndex = 0;

    for (let i = 0; i < tradeSteps.length; i++) {
      if (status >= tradeSteps[i].status) {
        currentIndex = i;
      }
    }

    return (currentIndex / (tradeSteps.length - 1)) * 100;
  };

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

  const groupedTrades = useMemo(() => {
    let result = [...pastTradeIns];

    if (statusFilter !== null) {
      result = result.filter(t => t.status === statusFilter);
    }

    switch (sortOption) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "status":
        result.sort((a, b) => a.status - b.status);
        break;
      default:
        break;
    }

    const groups = {};
    result.forEach(trade => {
      if (!groups[trade.status]) {
        groups[trade.status] = [];
      }
      groups[trade.status].push(trade);
    });

    return groups;
  }, [pastTradeIns, statusFilter, sortOption]);

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

  const handleIncreaseQty = async (item) => {
    const newQty = item.quantity + 1;
    await updateDraftItemQuantity(item.id, newQty);

    setCurrentTradeIn(prev => ({
      ...prev,
      items: prev.items.map(i =>
        i.id === item.id ? { ...i, quantity: newQty } : i
      )
    }));
  };

  const handleDecreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    const newQty = item.quantity - 1;
    await updateDraftItemQuantity(item.id, newQty);

    setCurrentTradeIn(prev => ({
      ...prev,
      items: prev.items.map(i =>
        i.id === item.id ? { ...i, quantity: newQty } : i
      )
    }));
  };

  const handleRemoveItem = async (item) => {
    await removeDraftItem(item.id);

    setCurrentTradeIn(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== item.id)
    }));
  };

  // ✅ FIXED: uses both id + tradeCode
  const submitTrade = async (trade) => {
    try {
      setLoading(true);

      await submitTradeIn(trade.id);

      toast.success("Trade submitted!");
      refreshTrades();

      navigate(`/userTradeSubmitted/${trade.tradeCode}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);      
    }
  };

  const cancelTrade = async (trade) => {
    try {
      setLoading(true);
      await cancelTradeIn(trade.id);
      refreshTrades();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Modal handlers now pass full trade
  const openSubmitConfirm = (trade) => {
    setConfirmModal({
      isOpen: true,
      type: "submit",
      trade,
    });
  };

  const openCancelConfirm = (trade) => {
    setConfirmModal({
      isOpen: true,
      type: "cancel",
      trade,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      type: null,
      trade: null,
    });
  };

  const handleConfirm = async () => {
    const { type, trade } = confirmModal;

    if (type === "submit") await submitTrade(trade);
    if (type === "cancel") await cancelTrade(trade);

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
                <strong>Trade Code:</strong> {currentTradeIn.tradeCode}
              </p>

              <p className={`mb-4 ${TradeInStatusColors[currentTradeIn.status]}`}>
                <strong>Status:</strong>{" "}
                {TradeInStatusLabels[currentTradeIn.status]}
              </p>

              <TradeInItemListWithPreview 
                items={currentTradeIn.items}
                handleDecrease={handleDecreaseQty}
                handleIncrease={handleIncreaseQty}
                handleRemoveItem={handleRemoveItem}
              >
                <button
                  onClick={() => navigate("/userAddTrade")}
                  className="px-6 py-3 bg-blue-600 neon-button font-bold rounded-lg"
                >
                  Add Cards
                </button>

                {currentTradeIn.items.length > 0 && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => openCancelConfirm(currentTradeIn)}
                      className="px-6 py-3 bg-red-700 neon-button font-bold rounded-lg"
                    >
                      Cancel Trade In
                    </button>

                    <button
                      onClick={() => openSubmitConfirm(currentTradeIn)}
                      className="px-6 py-3 bg-green-600 neon-button font-bold rounded-lg"
                    >
                      Submit Trade In
                    </button> 
                  </div>
                )}
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

        {/* (rest of your past trades section unchanged) */}

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