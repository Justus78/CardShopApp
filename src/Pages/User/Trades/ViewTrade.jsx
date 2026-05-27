import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../../Components/User/Navbar';
import Footer from '../../../Components/User/Footer'
import UserViewTradeDashboard from '../../../Components/User/UserViewTradeDashboard';
import TableHeader from '../../../Components/Admin/TableHeader';
import { acceptTradeInOffer, declineTradeInOffer, getTradeInById } from '../../../Services/TradeInService';
import TradeInItemListWithPreview from '../../../Components/User/TradeIn/TradeInItemListWithPreview';
import { TradeInStatus } from '../../../Context/Constants/TradeInStatus';
import { TradeInStatusColors } from '../../../Context/Constants/TradeInStatusColors';
import { TradeInStatusLabels } from '../../../Context/Constants/TradeInStatusLabels';
import { toast } from 'react-toastify';
import LoadingOverlay from '../../../Components/LoadingSpinners/LoadingOverlay';
import TradeCodeBadge from '../../../Components/User/TradeIn/TradeCodeBadge';
import StatusPill from '../../../Components/User/TradeIn/StatusPill';

const ViewTrade = () => {

  const { id } = useParams();

  const [trade, setTrade] = useState(null);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

    const LoadTrade = async () => {
    try {
      setLoading(true)
      const res = await getTradeInById(id);
      setTrade(res);
    } catch (err) {
      console.log(err)
      setError(err.message || "failed to load trade.")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadTrade();
  },[]);

  const AcceptOffer = async () => {
    try {
      setLoading(true);
      const res = await acceptTradeInOffer(id);
      LoadTrade();
    } catch (err) {
      console.log(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const DeclineOffer = async () => {
    try {
      setLoading(true)
      const res = await declineTradeInOffer(id);
      LoadTrade();
    } catch (err) {
      console.log(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  if (loading) return <LoadingOverlay />
    
    return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6'>
        <div className="min-h-screen bg-gray-900 text-white pt-28">
          <div className="max-w-6xl mx-auto p-6">
            <TableHeader title={"View Trade Status"} />

            <button 
              onClick={() => navigate("/userTrade")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border
               border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>

            <button 
              onClick={() => navigate(`/userTradeSubmitted/${trade.tradeCode}`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border m-4
              border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors"
            >
              View Instructions
            </button>

            {/* Trade section */ }
            <div className="bg-white/5 backdrop-blur-sm border border-gray-800 border-t-2 border-t-purple-600 rounded-xl p-6">
              {trade && (
                <section className="mb-12">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl  border-t-purple-600 border-t-2 mb-6 flex justify-between">
                    <div className='flex justify-between gap-10'>
                      <TradeCodeBadge code={trade.tradeCode} />
                      <TradeCodeBadge code={`Started: ${new Date(trade.createdAt).toLocaleString()}`} />
      
                      <StatusPill status={trade.status}/>
                    </div>

                    <div>              
                      <p>                        
                        {trade.finalValue ? 
                          <span className='font-bold text-green-400'><strong>Offer Amount:</strong>{" "}${trade.finalValue} </span>
                          :
                          <span className='text-white' ><strong>Offer: </strong>Still Processing</span>
                      }                     
                      </p>

                      {trade.status && trade.status == 6 && trade.finalValue > 0 ? 
                      <div className='pt-4 flex gap-4 justify-betweens'>
                          <button 
                          onClick={() => AcceptOffer()}
                            className='px-6 py-3 bg-blue-600 neon-button font-bold rounded-l'>
                              Accept Offer
                          </button>

                          <button 
                            onClick={() => DeclineOffer()}
                            className='px-6 py-3 bg-red-800 neon-button font-bold rounded-l'>
                              Decline Offer
                          </button>
                      </div>
                      :"" }
                    </div>
                      
                  </div>

                  <TradeInItemListWithPreview
                    items={trade.items}
                    status={trade.status}
                    mode="user"
                  >
                  </TradeInItemListWithPreview>                       
                  
              </section>
              )}  
            </div>        
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ViewTrade