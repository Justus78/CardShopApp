import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getTradeInByIdAdmin, submitFinalOfferFromAdmin, updateTradeInItemFinalValue } from '../../../Services/TradeInService';
import TableHeader from '../../../Components/Admin/TableHeader';
import Navbar from '../../../Components/Admin/Navbar';
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../../Context/Constants/TradeInStatusColors";
import { TradeInStatus } from '../../../Context/Constants/TradeInStatus';
import { div } from 'framer-motion/client';

export const UpdateTradeIn = () => {
    const {id} = useParams();
    const [trade, setTrade] = useState(null);
    const [hoverImage, setHoverImage] = useState(null);  
    const [finalValues, setFinalValues] = useState({});  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Refs to handle sticky image bounds
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const getTrade = async () => {
            try {
                setLoading(true);
                const trade = await getTradeInByIdAdmin(id);
                setTrade(trade);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }            
        }       
        getTrade();
        console.log(trade)
    },[]);

    useEffect(() => {
        if (!trade) return;

        const map = {};
        trade.items.forEach(i => {
            map[i.id] = i.finalUnitValue ?? "";
        });
        setFinalValues(map);
    }, [trade]);


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
      }, [trade]);

      const handleFinalValueBlur = async (itemId) => {
        const raw = finalValues[itemId];

        if (raw === "") return; // allow empty while editing

        const value = parseFloat(raw);
        if (isNaN(value) || value < 0) return;

        try {
            await updateTradeInItemFinalValue(itemId, value);

            setTrade(prev => ({
            ...prev,
            items: prev.items.map(i =>
                i.id === itemId ? { ...i, finalUnitValue: value } : i
            )
            }));
        } catch (err) {
            console.error(err);
        }
    };
    
    const submitFinalOffer = async (id) => {
        try {
            setLoading(true)
            const res = await submitFinalOfferFromAdmin(id);
            console.log(res)
        } catch (err) {
            setError(err)
            console.log(err)
        } finally {
            setLoading(false)
        }

    };

    const isOfferSent = trade?.status === TradeInStatus.OfferSent;
    const hasUnsetPrices = trade?.items?.some(i => i.finalUnitValue == null);

    const isLocked =
        trade?.status >= TradeInStatus.OfferSent &&
        trade?.status !== TradeInStatus.Declined;

  return (
    <div>
        <Navbar />

        <div className="min-h-screen bg-gray-900 text-white pt-28">
            <div className="max-w-6xl mx-auto p-6">
            <TableHeader title={`Trade In`} />

        {/* Current Trade-In Section */}
        <section className="mb-12" ref={containerRef}>
            <h2 className="text-2xl font-semibold neon-text mb-4">
            Current Trade-In
            </h2>

            {trade ? (
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
                        <span className="font-bold">User: </span>{" "}
                        {trade.userEmail}
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-bold">Trade-In ID:</span>{" "}
                        {trade.id}
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-bold">Trade-In Started: </span>{" "}
                        {new Date(trade.createdAt).toLocaleString()}
                    </p>

                    <p className="text-lg mb-2">
                    <span className="font-bold">Items:</span>{" "}
                    {trade.items?.length > 0 ? (
                        <div className="space-y-3">
                        {trade.items.map((item) => (
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
                                        <p className="text-pink-300 text-sm">
                                            Foil: {item.foilType ? item.foilType : "non-foil"}
                                        </p>
                                    </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-cyan-200">Qty: {item.quantity}</p>
                                        <p className="text-green-300">
                                            Est: ${item.estimatedUnitValue?.toFixed(2)}
                                        </p>
                                        <p className="text-green-300">
                                            Offer: ${item.finalUnitValue?.toFixed(2)}
                                        </p>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={finalValues[item.id]}
                                        disabled={isOfferSent}
                                        onChange={(e) =>
                                            setFinalValues(prev => ({
                                            ...prev,
                                            [item.id]: e.target.value
                                            }))
                                        }
                                        onBlur={() => handleFinalValueBlur(item.id)}
                                        className={`w-24 px-2 py-1 rounded
                                            ${isOfferSent
                                            ? "bg-black border-gray-600 text-gray-500 cursor-not-allowed"
                                            : "bg-black border-cyan-400 text-cyan-200"}`}
                                    />


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
                                disabled={isOfferSent || hasUnsetPrices || loading}
                                onClick={() => submitFinalOffer(trade.id)}
                                className={`px-6 py-3 font-bold rounded-lg neon-button
                                    ${isOfferSent
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-green-600"}
                                    disabled:opacity-50`}
                                >
                                {isOfferSent ? "Offer Already Sent" : "Submit Final Offer"}
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

                    <p className={`text-lg mb-2 ${TradeInStatusColors[trade.status]}`}>
                    <span className="font-bold">Status:</span>{" "}
                    {TradeInStatusLabels[trade.status] ?? "Unknown"}
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

        {/* <div className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-md hover:shadow-cyan-400 transition">
            <div className="space-y-3">
                {trade.items.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-md hover:shadow-cyan-400 transition"                        
                    >
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <div className='border-4 w-20 h-25 mr-'>
                                    <img src={item.imageUrl} alt="Card Image" className='w-full'/>
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
            </div>

        </div> */}
    </div>
     </div>
    </div>
  )
}
