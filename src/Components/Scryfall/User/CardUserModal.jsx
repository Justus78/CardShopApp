import React from 'react'
import { CardCondition, CardRarity, CardType } from "../../../Constants/enums";

const CardUserModal = ({ 
    card, 
    onClose, 
    onSubmit,
    quantity,
    setQuantity,
    selectedCondition,
    setSelectedCondition,
}) => {

    const img =
    card.image_uris?.normal ||
    card.card_faces?.[0]?.image_uris?.normal;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg border border-purple-500 
                      w-80 sm:w-96 max-w-full max-h-[90vh] overflow-y-auto relative">

            <button
                onClick={onClose}
            > 
                ✖
            </button>

            <img src={img} alt={card.name}  className="w-full rounded-lg mb-4"/>

            <h2 className="text-2xl font-bold text-center mb-3 text-cyan-300">{card.name}</h2>
            <p className="text-center text-gray-400 mb-2">{card.set_name}</p>
            <p className="text-center text-gray-400 mb-4">
                Market Price: ${card.prices?.usd || "N/A"}
            </p>

            <input
                type="number"
                placeholder="Stock Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500 
                            focus:ring-2 focus:ring-cyan-500"
            />
    
            <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500"
                >
                <option value="">Select Condition</option>
                {Object.values(CardCondition).map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>

            <button
                onClick={onSubmit}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-cyan-500 
                        text-white py-2 rounded-xl font-semibold hover:scale-105 
                        transition-all duration-300"
            >
            Add to trade in
          </button>

        </div>
    </div>
  )
}

export default CardUserModal