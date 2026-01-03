import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Admin/Navbar'
import { getAllTradeInsAdmin } from '../../../Services/TradeInService';
import TableHeader from '../../../Components/Admin/TableHeader';
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../../Context/Constants/TradeInStatusColors";
import { useNavigate } from 'react-router-dom';
const TradeInHome = () => {
    const [loading, setLoading] = useState(false);
    const [trades, setTrades] = useState([]);
    const navigate = useNavigate();

    // get all trade ins
    useEffect( () => {
        const getTrades = async () => {
        try {
            const trades = await getAllTradeInsAdmin();
            setTrades(trades);
            console.log(trades)
        } catch (err) {
            console.log(err.message)
        }}
        getTrades();
    },[]);
    // sort trade ins by status
    // have sorting controls to display trade ins by status
    // each trade in with the status submitted can be directed to a new page
    /// that shows all the cards in the trade

  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 text-white pt-28" >
            <div className="max-w-6xl mx-auto p-6">
                <TableHeader title={"Trade Ins"} />

                {/** list of trade ins */}
                <section>
                    {trades.length > 0 ? (
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {trades.map((item) => (
                                <div
                                    onClick={() => navigate(`/admin/UpdateTrade/${item.id}`)}
                                    key={item.id}
                                    className=' "bg-gray-800 p-4 rounded-lg shadow-neon border-neon border-2'
                                >
                                 
                                    <div>
                                        <p className='text-lg mb-1'><span></span>id: {item.id}</p>
                                        <p>User: {item.userEmail}</p>
                                        <p>Items: {item.items?.length ?? 0}</p>                                        <p className={`text-lg mb-2 ${TradeInStatusColors[item.status]}`}>
                                            <span className="font-bold">Status:</span>{" "}
                                            {TradeInStatusLabels[item.status] ?? "Unknown"}
                                        </p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<div>

                    </div>)}
                </section>

            </div>
        </div>
        
        
    </>    
)
}

export default TradeInHome