import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../../Components/User/Navbar';
import UserViewTradeDashboard from '../../../Components/User/UserViewTradeDashboard';
import TableHeader from '../../../Components/Admin/TableHeader';
import { acceptTradeInOffer, declineTradeInOffer, getTradeInById } from '../../../Services/TradeInService';
import TradeInItemListWithPreview from '../../../Components/User/TradeInItemListWithPreview';
import { TradeInStatus } from '../../../Context/Constants/TradeInStatus';
import { TradeInStatusColors } from '../../../Context/Constants/TradeInStatusColors';
import { TradeInStatusLabels } from '../../../Context/Constants/TradeInStatusLabels';
import { toast } from 'react-toastify';
import LoadingOverlay from '../../../Components/LoadingSpinners/LoadingOverlay';

const ViewTrade = () => {

  const { id } = useParams();

  const [trade, setTrade] = useState(null);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTrade = async () => {
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
    loadTrade();
  },[]);

  const AcceptOffer = async () => {
    try {
      setLoading(true);
      const res = await acceptTradeInOffer(id);
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
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white px-4 
              py-2 rounded-lg hover:shadow-[0_0_15px_#0ff] transition-all duration-300 m-4 cursor-pointer"
            >
              Back to Dashboard
            </button>

            <button 
              onClick={() => navigate(`/userTradeSubmitted/${trade.tradeCode}`)}
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white px-4 
              py-2 rounded-lg hover:shadow-[0_0_15px_#0ff] transition-all duration-300 m-4 cursor-pointer"
            >
              View Instructions
            </button>

            {trade && (
              <section className="mb-12">
                <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2 mb-6 flex justify-between">
                  <div>
                    <p><strong>ID:</strong> {trade.tradeCode}</p>
                    <p>
                      <strong>Started:</strong>{" "}
                      {new Date(trade.createdAt).toLocaleString()}
                    </p>
    
                    <p className={`${TradeInStatusColors[trade.status]} mt-2`}>
                      <strong>Status:</strong>{" "}
                      {TradeInStatusLabels[trade.status]}
                    </p>
                  </div>

                   <div>
            
                    <p>
                      
                      {trade.finalValue ? 
                        <span className='font-bold text-green-400'><strong>Offer Amount:</strong>{" "}{trade.finalValue} </span>
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
                  mode="user"
                >
                  </TradeInItemListWithPreview>                       
                
            </section>
            )}          
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTrade