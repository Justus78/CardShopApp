import React from 'react'
import { TradeInStatusColors } from '../../Context/Constants/TradeInStatusColors'
import { TradeInStatusLabels } from '../../Context/Constants/TradeInStatusLabels'
import { useNavigate } from 'react-router-dom'

const TradeIn = ({key, trade}) => {
    const navigate = useNavigate();
    console.log(trade)
  return (
    <>
        <div
            onClick={() => navigate(`/admin/UpdateTrade/${trade.id}`)}
            key={trade.id}
            className=' "bg-gray-800 p-4 rounded-lg shadow-neon border-neon border-2'
        >
            
            <div>
                <p className='text-lg mb-1'><span></span>id: {trade.id}</p>
                <p>User: {trade.userEmail}</p>
                <p>Items: {trade.items?.length ?? 0}</p>                                        
                <p className={`text-lg mb-2 ${TradeInStatusColors[trade.status]}`}>
                    <span className="font-bold">Status:</span>{" "}
                    {TradeInStatusLabels[trade.status] ?? "Unknown"}
                </p>

            </div>
        </div>
    </>
  )
}

export default TradeIn