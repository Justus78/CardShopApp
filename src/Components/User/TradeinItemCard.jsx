import React from "react";

const TradeInItemCard = ({ item, onHover, children }) => {
  return (
    <div
      className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-md hover:shadow-cyan-400 transition"
      onMouseEnter={() => onHover?.(item.imageUrl)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="flex justify-between">
        {children}
      </div>
    </div>
  );
};

export default TradeInItemCard;