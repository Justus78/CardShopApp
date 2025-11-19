import React from "react";

const CardItem = ({ card, handleAddClick }) => {
  const img =
    card.image_uris?.normal ||
    card.card_faces?.[0]?.image_uris?.normal;

  return (
    <div
      onClick={() => handleAddClick(card)}
      className="relative bg-gray-900 bg-opacity-70 border border-gray-800 rounded-2xl 
                 p-4 shadow-lg hover:shadow-[0_0_20px_#9333ea] transition-all duration-300 
                 hover:scale-105 cursor-pointer group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 
                      via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-20 
                      blur-xl transition duration-500"></div>

      <img src={img} alt={card.name} className="w-full rounded mb-3" />

      <h2 className="font-semibold text-lg text-purple-300">{card.name}</h2>
      <p className="text-sm text-gray-400">{card.set_name}</p>
      <p className="text-cyan-400 text-sm italic capitalize">{card.rarity}</p>
      <p className="text-sm mt-1">${card.prices?.usd || card.prices?.usd_foil || "N/A"}</p>
    </div>
  );
};

export default CardItem;
