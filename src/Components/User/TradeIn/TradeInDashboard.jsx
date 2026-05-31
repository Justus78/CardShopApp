import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TableHeader from "../../Admin/TableHeader";
import ConfirmModal from "../../ConfirmModal";
import TradeInItemListWithPreview from "./TradeInItemListWithPreview";
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../../Context/Constants/TradeInStatusColors";
import { TradeInStatusDotColors } from "../../../Context/Constants/TradeInStatusDotColors";
import { TradeInStatusIcons } from "../../../Constants/enums";
import { useTradeIns } from "../../../Hooks/User/UserTradeIns";
import { ArrowDown, ArrowUp, AlignJustify, Folder } from "lucide-react";
import StatusPill from "./StatusPill";
import TradeCodeBadge from "./TradeCodeBadge";
import ProgressBar from "./ProgressBar";
import MetaSummaryPill from "./MetaSummaryPill";
import TradeStatusGroup from "./TradeStatusGroup";
import TradeProcessModal from "./TradeProcessModal";
import { HelpCircle } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest", icon: <ArrowDown size={12} /> },
  { value: "oldest", label: "Oldest", icon: <ArrowUp size={12} /> },
  { value: "status", label: "Status",  icon: <AlignJustify size={12} /> },
];

const TradeInDashboard = () => {
  const {
    currentTradeIn,
    groupedTrades,
    statusFilter,
    sortOption,
    setStatusFilter,
    setSortOption,
    startTradeDraft,
    handleIncreaseQty,
    handleDecreaseQty,
    handleRemoveItem,
    submitTrade,
    cancelTrade,
    getProgressPercent,
  } = useTradeIns();

  const navigate = useNavigate();

  const [showHowItWorks ,setShowHowItWorks] = useState(null)
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    trade: null,
  });

  const openSubmitConfirm = (trade) =>
    setConfirmModal({ isOpen: true, type: "submit", trade });
  const openCancelConfirm = (trade) =>
    setConfirmModal({ isOpen: true, type: "cancel", trade });
  const closeConfirmModal = () =>
    setConfirmModal({ isOpen: false, type: null, trade: null });

  const handleConfirm = async () => {
    const { type, trade } = confirmModal;
    if (type === "submit") await submitTrade(trade);
    if (type === "cancel") await cancelTrade(trade);
    closeConfirmModal();
  };

  const totalTrades = Object.values(groupedTrades).flat().length;
  
  return (
    <div className="min-h-screen text-white pt-28">
      <div className="max-w-6xl mx-auto p-6">

        {/* PAGE HEADER */}
        <div className="mb-10">
          <TableHeader title="Trade-in dashboard" />
          <p className="text-sm text-gray-500 mt-1">
            Manage and track your card trade-ins
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {currentTradeIn && (
              <MetaSummaryPill color="bg-purple-500" label="1 active" />
            )}
            {Object.entries(groupedTrades).map(([status, trades]) => (
              <MetaSummaryPill
                key={status}
                color={TradeInStatusDotColors[status]}
                label={`${trades.length} ${TradeInStatusLabels[status].toLowerCase()}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowHowItWorks(true)}
          className="animate-pulse-ring fixed top-50 left-15 z-40 inline-flex items-center gap-2 px-5 py-3 
                    bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 
                    text-sm font-semibold rounded-full shadow-lg transition-all hover:-translate-y-0.5"
        >
          <HelpCircle size={16} />
          How it works
        </button>

        <TradeProcessModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />

        {/*  CURRENT TRADE  */}
        <section className="mb-12">
          <p className="text-lg font-semibold uppercase tracking-widest text-gray-600 mb-3">
            Current trade-in
          </p>

          {currentTradeIn ? (
            <div className="bg-white/5 backdrop-blur-sm border border-gray-800 border-t-2 border-t-purple-600 rounded-xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <TradeCodeBadge code={currentTradeIn.tradeCode} />
                <StatusPill status={currentTradeIn.status} width={'w-1/11'} />
              </div>

              <TradeInItemListWithPreview
                items={currentTradeIn.items}
                handleDecrease={handleDecreaseQty}
                handleIncrease={handleIncreaseQty}
                handleRemoveItem={handleRemoveItem}
                mode="user"
              >
                <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-800">
                  <button
                    onClick={() => navigate("/userAddTrade")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add cards
                  </button>
                 
                  {currentTradeIn.items.length > 0 && (
                    <button
                      onClick={() => openSubmitConfirm(currentTradeIn)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-gray-800 border border-gray-600 text-gray-300 text-sm font-semibold rounded-lg transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Submit trade-in
                    </button>
                  )}

                  <button
                    onClick={() => openCancelConfirm(currentTradeIn)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-red-950/40 border border-red-900/60 text-red-400 text-sm font-semibold rounded-lg transition-colors ml-auto"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Cancel
                  </button>
                </div>
              </TradeInItemListWithPreview>
            </div>
          ) : (
            <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-800 border-dashed rounded-xl p-10">
              <p className="text-gray-500 mb-4 text-sm">You have no active trade-ins.</p>
              <button
                onClick={startTradeDraft}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Start a trade-in
              </button>
            </div>
          )}
        </section>
        
        {/* PAST TRADES  */}
        <section>
          <p className="text-lg font-semibold uppercase tracking-widest text-gray-600 mb-3">
            Past trade-ins
          </p>

          {/* Filter + Sort bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-3 mb-6">
            {/* Status pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter(null)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs border transition-all ${
                  statusFilter === null
                    ? "border-purple-600 bg-purple-950/50 text-purple-300 font-semibold"
                    : "border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                All statuses
              </button>

              {Object.entries(TradeInStatusLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(Number(key))}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-all ${
                    statusFilter === Number(key)
                      ? "border-purple-600 bg-purple-950/50 text-purple-300 font-semibold"
                      : "border-gray-700 text-gray-500 hover:border-gray-500"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${TradeInStatusDotColors[key]}`} />
                  {label}
                </button>
              ))}
            </div>

            {/* Sort buttons */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-gray-600 mr-1">Sort:</span>
              {SORT_OPTIONS.map((opt, i) => (
                <React.Fragment key={opt.value}>
                  {i > 0 && <span className="w-px h-4 bg-gray-800" />}
                  <button
                    onClick={() => setSortOption(opt.value)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs border transition-all ${
                      sortOption === opt.value
                        ? "bg-gray-800 border-gray-600 text-gray-200 font-semibold"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <span aria-hidden="true">{opt.icon}</span> {opt.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Trade cards grid */}
          {Object.keys(groupedTrades).length > 0 ? (
            Object.entries(groupedTrades).map(([status, trades]) => (
            <TradeStatusGroup key={status} status={status} trades={trades} getProgressPercent={getProgressPercent} />
              ))
            ) : (
             <p className="text-sm text-gray-600">You have no past trade-ins.</p>
          )}
        </section>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === "submit" ? "Submit trade-in" : "Cancel trade-in"}
        message={
          confirmModal.type === "submit"
            ? "Are you sure you want to submit this trade-in?"
            : "Are you sure you want to cancel this trade-in?"
        }
        confirmText="Yes"
        cancelText="No"
        confirmColor={confirmModal.type === "submit" ? "bg-green-600" : "bg-red-600"}
        onConfirm={handleConfirm}
        onCancel={closeConfirmModal}
      />
    </div>
  );
};

export default TradeInDashboard;