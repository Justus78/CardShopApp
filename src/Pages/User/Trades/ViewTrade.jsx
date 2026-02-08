import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../Components/User/Navbar';
import UserViewTradeDashboard from '../../../Components/User/UserViewTradeDashboard';
import TableHeader from '../../../Components/Admin/TableHeader';
import { acceptTradeInOffer, declineTradeInOffer, getTradeInById } from '../../../Services/TradeInService';
import TradeInItemListWithPreview from '../../../Components/User/TradeInItemListWithPreview';
import { TradeInStatus } from '../../../Context/Constants/TradeInStatus';
import { TradeInStatusColors } from '../../../Context/Constants/TradeInStatusColors';
import { TradeInStatusLabels } from '../../../Context/Constants/TradeInStatusLabels';
import { toast } from 'react-toastify';

const ViewTrade = () => {

  const { id } = useParams();

  const [trade, setTrade] = useState(null);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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


  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6'>
        <div className="min-h-screen bg-gray-900 text-white pt-28">
          <div className="max-w-6xl mx-auto p-6">
            <TableHeader title={"View Trade Status"} />
            {trade && (
              <section className="mb-12">
                <div className="bg-gray-800 p-6 rounded-lg shadow-neon border-neon border-2 mb-6 flex justify-between">
                  <div>
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

                  <div>
                    <p><strong>ID:</strong> {trade.id}</p>
                    <p>
                      <strong>Started:</strong>{" "}
                      {new Date(trade.createdAt).toLocaleString()}
                    </p>
    
                    <p>
                      <strong>Offer Amount:</strong>{" "}
                      <span className='font-bold text-green-400'>${trade.finalValue} </span>
                      
                    </p>
                    {trade.status && trade.status == 6 ? 
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

                <TradeInItemListWithPreview items={trade.items} renderItemRightExtra={null} />
                
                
            </section>
            )}
              



          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTrade