import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Admin/Navbar'
import { getAllTradeInsAdmin } from '../../../Services/TradeInService';
import TableHeader from '../../../Components/Admin/TableHeader';
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusColors } from "../../../Context/Constants/TradeInStatusColors";
import { useNavigate } from 'react-router-dom';
import TradeIn from '../../../Components/Admin/TradeIn';
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
                            {trades.map((trade) => (
                                <TradeIn key={trade.id} trade={trade} /> 
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