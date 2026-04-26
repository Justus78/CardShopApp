// /hooks/useTradeIns.js
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  getUserTradeIns,
  getOrCreateDraftTradeIn,
  submitTradeIn,
  cancelTradeIn,
  updateDraftItemQuantity,
  removeDraftItem
} from "../../Services/TradeInService";

import { TradeInStatus } from "../../Context/Constants/TradeInStatus";

export const useTradeIns = () => {
  const [currentTradeIn, setCurrentTradeIn] = useState(null);
  const [pastTradeIns, setPastTradeIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortOption, setSortOption] = useState("newest");

  const navigate = useNavigate();

  const tradeSteps = [
    { status: 1, label: "Submitted" },
    { status: 3, label: "Shipped" },
    { status: 4, label: "Received" },
    { status: 8, label: "Completed" },
  ];

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
    }

    const groups = {};
    result.forEach(trade => {
      if (!groups[trade.status]) groups[trade.status] = [];
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

  const getProgressPercent = (status) => { 
    let currentIndex = 0; 
    
    for (let i = 0; i < tradeSteps.length; i++) { 
        if (status >= tradeSteps[i].status) { 
            currentIndex = i; 
        } } 
        
        return (currentIndex / (tradeSteps.length - 1)) * 100; };

  return {
    currentTradeIn,
    groupedTrades,
    loading,
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
    getProgressPercent
  };
};