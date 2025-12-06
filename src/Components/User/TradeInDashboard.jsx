import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import Navbar from "../../Components/User/Navbar";
import TableHeader from "../Admin/TableHeader";
import { getOrCreateDraftTradeIn, getUserTradeIns } from "../../Services/TradeInService";
import { useNavigate } from "react-router-dom";


const TradeInDashboard = () => {
  const { user } = useContext(DataContext);
  const [currentTradeIn, setCurrentTradeIn] = useState(null);
  const [pastTradeIns, setPastTradeIns] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(pastTradeIns)

  useEffect(() => {
  const fetchTrades = async () => {
      try {
        setLoading(true);

        const trades = await getUserTradeIns(); 

        // Find the trade with status Draft
        const current = trades.find(t => t.status === 0) || null;

        // Everything else becomes past trade-ins
        const past = trades.filter(t => t.status !== 0);

        setCurrentTradeIn(current);
        setPastTradeIns(past);

      } catch (err) {
        toast.error("Failed to load trade-ins."); // lowercase .error
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  const startTradeDraft = async () => {
    // this starts a new trade draft
    try {
      setLoading(true)
      const tradeIn = getOrCreateDraftTradeIn();
      setCurrentTradeIn(tradeIn);
    } catch (err){
      
      toast.error('Failed to start a new trade in. Please try again later.')
    } finally {
      setLoading(false)
      console.log("current trade in:" + currentTradeIn)
    }
    
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <TableHeader title={"Trade In Dashboard"}/>

        {/* Current Trade-In */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold neon-text mb-4">
            Current Trade-In
          </h2>

          {currentTradeIn && currentTradeIn != null ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2">
              <p className="text-lg mb-2">
                <span className="font-bold">Trade-In ID:</span> {currentTradeIn.id}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Trade-In Started: </span> {new Date(currentTradeIn.createdAt).toLocaleString()}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Items:</span>{" "}
                {currentTradeIn?.items?.length > 0 ? (
                <div className="space-y-3">
                    {currentTradeIn.items.map((item) => (
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

                    <div className="flex justify-between">

                        <button onClick={() => navigate('/userAddTrade')} className="px-6 py-3 bg-blue-600 neon-button font-bold rounded-lg cursor-pointer">
                          Add Cards
                        </button>

                        <button onClick={() => navigate('/userAddTrade')} className="px-6 py-3 bg-red-700 neon-button font-bold rounded-lg cursor-pointer">
                          Cancel Trade In
                        </button>

                        <button onClick={() => navigate('/userAddTrade')} className="px-6 py-3 bg-green-600 neon-button font-bold rounded-lg cursor-pointer">
                          Submit Trade In
                        </button>

                      </div>
                </div>
                ) : (
                  <>
                    <p className="text-gray-400">No items in trade-in yet.</p>
                    <button onClick={() => navigate('/userAddTrade')} className="px-6 py-3 neon-button font-bold rounded-lg">
                        Add Cards
                    </button>
                  </>
                )} 
              </p>

              <p className="text-lg mb-2">
                <span className="font-bold">Status:</span> {currentTradeIn.status}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You have no active trade-ins.</p>

              {/** this button needs to be changed to create a new trade in draft and display it on the screen
               * then allows the user to click a button to add new cards to the trade in
               */}

              {/* <a href="/userAddTrade"> */}
                <button onClick={() => startTradeDraft()} className="px-6 py-3 neon-button font-bold rounded-lg">
                    Start a Trade-In
                </button>
              {/* </a> */}
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
                    <span className="font-bold">Items:</span>{" "}
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
