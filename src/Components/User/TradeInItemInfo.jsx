import React from "react";

const TradeInItemInfo = ({ item }) => {
  return (
    <div className="flex">
      <div className="border-4 w-20 h-28 mr-5">
        <img
          src={item.imageUrl}
          alt={item.cardName}
          className="w-full h-full object-contain"
        />
      </div>

      <div>
        <p className="text-cyan-300 font-bold text-lg">
          {item.cardName}
        </p>

        <p className="text-purple-300 text-sm">
          Set: {item.setCode}
        </p>

        <p className="text-pink-300 text-sm">
          Condition: {item.condition}
        </p>
      </div>
    </div>
  );
};

export default TradeInItemInfo;