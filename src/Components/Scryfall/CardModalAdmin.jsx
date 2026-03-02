import React from "react";
import { CardCondition, CardRarity, CardType } from "../../Constants/enums";

const CardModalAdmin = ({
  card,
  onClose,
  onSubmit,
  price,
  setPrice,
  inventory,
  setInventory,
  selectedCondition,
  setSelectedCondition,
  selectedRarity,
  setSelectedRarity,
  selectedType,
  setSelectedType
}) => {
    const img =
    card.image_uris?.normal ||
    card.card_faces?.[0]?.image_uris?.normal;

  return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-lg border border-purple-500 
                         w-[600px] max-h-[90vh] relative flex gap-12">
        
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center 
                            rounded-full bg-gray-800 hover:bg-red-600 
                            transition duration-200 text-white text-xl"
              >
                X
              </button>
        <div>
          <img src={img} alt={card.name} className="w-full rounded-lg mb-4" />

          <h2 className="text-2xl font-bold text-center mb-3 text-cyan-300">{card.name}</h2>
          <p className="text-center text-gray-400 mb-2">{card.set_name}</p>
          <p className="text-center text-gray-400 mb-4">
            Market Price: ${card.prices?.usd || "N/A"}
          </p>
        </div>

        <div>
          <div className="space-y-3 mt-10">
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-purple-500 
                        focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="number"
              placeholder="Stock Quantity"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
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

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-purple-500"
            >
              <option value="">Select Rarity</option>
              {Object.values(CardRarity).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-purple-500"
            >
              <option value="">Select Type</option>
              {Object.values(CardType).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

            <button
              onClick={onSubmit}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-cyan-500 
                        text-white py-2 rounded-xl font-semibold hover:scale-105 
                        transition-all duration-300"
            >
              Add to Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModalAdmin;
