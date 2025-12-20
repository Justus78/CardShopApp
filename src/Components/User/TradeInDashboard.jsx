import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableHeader from "../Admin/TableHeader";
import { TradeInStatusLabels } from "../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../Context/Constants/TradeInStatusColors";
import {
  getUserTradeIns,
  getOrCreateDraftTradeIn,
  submitTradeIn,
  cancelTradeIn
} from "../../Services/TradeInService";

const TradeInDashboard = () => {
  const [currentTradeIn, setCurrentTradeIn] = useState(null);
  const [pastTradeIns, setPastTradeIns] = useState([]);
  const [hoverImage, setHoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Refs to handle sticky image bounds
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Fetch trade-ins on mount
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const trades = await getUserTradeIns();

        const current = trades.find((t) => t.status === 0) || null;
        const past = trades.filter((t) => t.status !== 0);

        setCurrentTradeIn(current);
        setPastTradeIns(past);
        
      } catch (err) {
        toast.error("Failed to load trade-ins.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  // Start a new draft trade-in
  const startTradeDraft = async () => {
    try {
      setLoading(true);
      const trade = await getOrCreateDraftTradeIn();
      setCurrentTradeIn(trade);
    } catch (err) {
      toast.error("Failed to start a new trade-in.");
    } finally {
      setLoading(false);
    }
  };

  // Submit current trade-in
  const submitTradeInRequest = async (id) => {
    try {
      setLoading(true);
      await submitTradeIn(id);
      toast.success("Trade submitted successfully!");
      setCurrentTradeIn(null);
      await refreshTrades();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel current trade-in
  const cancelCurrentTradeIn = async (id) => {
    try {
      setLoading(true);
      await cancelTradeIn(id);
      setCurrentTradeIn(null);
    } catch (err) {
      toast.error(err.message || "Failed to cancel trade-in.");
    } finally {
      setLoading(false);
    }
  };

  // Refresh trade-ins
  const refreshTrades = async () => {
    try {
      const trades = await getUserTradeIns();
      const current = trades.find((t) => t.status === 0) || null;
      const past = trades.filter((t) => t.status !== 0);

      setCurrentTradeIn(current);
      setPastTradeIns(past);
    } catch (err) {
      toast.error("Failed to refresh trade-ins.");
    }
  };

  // Handle sticky image box while scrolling
  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    const handleScroll = () => {
      const image = imageRef.current;
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const imageHeight = image.offsetHeight;
      const topOffset = 150; // Adjust for navbar height + spacing (px)

      if (containerRect.top + imageHeight + topOffset < window.innerHeight) {
        // Image fits inside container → sticky
        image.style.position = "sticky";
        image.style.top = `${topOffset}px`;
      } else if (containerRect.top < topOffset) {
        // Image reaches bottom of container → stop
        image.style.position = "absolute";
        image.style.top = `${container.offsetHeight - imageHeight}px`;
      } else {
        // Reset
        image.style.position = "relative";
        image.style.top = "0px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentTradeIn]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-28">
      <div className="max-w-6xl mx-auto p-6">
        <TableHeader title="Trade In Dashboard" />

        {/* Current Trade-In Section */}
        <section className="mb-12" ref={containerRef}>
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Current Trade-In
          </h2>

          {currentTradeIn ? (
            <div className="flex gap-10 items-start">
              {/* LEFT: Sticky Image Box */}
              <div className="flex-shrink-0 w-56" ref={imageRef}>
                <div className="w-56 h-80 border-4 border-cyan-400 rounded-lg bg-black/40 flex items-center justify-center">
                  {hoverImage ? (
                    <img
                      src={hoverImage}
                      alt="Card preview"
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm text-center px-2">
                      Hover a card to preview
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT: Trade-In Items */}
              <div className="flex-1 space-y-3">
                <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2">
                  <p className="text-lg mb-2">
                    <span className="font-bold">Trade-In ID:</span>{" "}
                    {currentTradeIn.id}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-bold">Trade-In Started: </span>{" "}
                    {new Date(currentTradeIn.createdAt).toLocaleString()}
                  </p>

                  <p className="text-lg mb-2">
                    <span className="font-bold">Items:</span>{" "}
                    {currentTradeIn.items?.length > 0 ? (
                      <div className="space-y-3">
                        {currentTradeIn.items.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-md hover:shadow-cyan-400 transition"
                            onMouseEnter={() => setHoverImage(item.imageUrl)}
                            onMouseLeave={() => setHoverImage(null)}
                          >
                            <div className="flex justify-between">
                              <div className="flex">
                                <div className="border-4 w-20 h-25 mr-5">
                                  <img src={item.imageUrl} alt="" className="w-full" />
                                </div>
                                <div>
                                  <p className="text-cyan-300 font-bold text-lg">
                                    {item.cardName}
                                  </p>
                                  <p className="text-purple-300 text-sm">
                                    Set: {item.setCode}
                                  </p>
                                  <p className="text-pink-300 text-sm">
                                    Condition: {item.condition}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-cyan-200">Qty: {item.quantity}</p>
                                <p className="text-green-300">
                                  Est: ${item.estimatedUnitValue?.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Action Buttons */}
                        <div className="flex justify-between">
                          <button
                            onClick={() => navigate("/userAddTrade")}
                            className="px-6 py-3 bg-blue-600 neon-button font-bold rounded-lg"
                          >
                            Add Cards
                          </button>

                          <button
                            onClick={() =>
                              cancelCurrentTradeIn(currentTradeIn.id)
                            }
                            className="px-6 py-3 bg-red-700 neon-button font-bold rounded-lg"
                          >
                            Cancel Trade In
                          </button>

                          <button
                            onClick={() =>
                              submitTradeInRequest(currentTradeIn.id)
                            }
                            className="px-6 py-3 bg-green-600 neon-button font-bold rounded-lg"
                          >
                            Submit Trade In
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-400">No items in trade-in yet.</p>
                        <button
                          onClick={() => navigate("/userAddTrade")}
                          className="px-6 py-3 neon-button font-bold rounded-lg"
                        >
                          Add Cards
                        </button>
                      </>
                    )}
                  </p>

                  <p className={`text-lg mb-2 ${TradeInStatusColors[currentTradeIn.status]}`}>
                    <span className="font-bold">Status:</span>{" "}
                    {TradeInStatusLabels[currentTradeIn.status] ?? "Unknown"}
                  </p>
                
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You have no active trade-ins.</p>
              <button
                onClick={() => startTradeDraft()}
                className="px-6 py-3 neon-button font-bold rounded-lg"
              >
                Start a Trade-In
              </button>
            </div>
          )}
        </section>

        {/* Past Trade-Ins Section */}
        <section>
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Past Trade-Ins
          </h2>
          {pastTradeIns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTradeIns.map((trade) => (
                <div
                  key={trade.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-neon border-neon border-2"
                >
                  <p className="text-lg mb-1">
                    <span className="font-bold">ID:</span> {trade.id}
                  </p>
                  <span className="font-bold">Items:</span>
                  {trade?.items?.length > 0 ? (
                    <div className="space-y-3">
                      {trade.items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-md hover:shadow-cyan-400 transition"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="text-cyan-300 font-bold text-lg">{item.cardName}</p>
                              <p className="text-purple-300 text-sm">Set: {item.setCode}</p>
                              <p className="text-pink-300 text-sm">Condition: {item.condition}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-cyan-200">Qty: {item.quantity}</p>
                              <p className="text-green-300">
                                Est: ${item.estimatedUnitValue?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No items in trade-in yet.</p>
                  )}
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
