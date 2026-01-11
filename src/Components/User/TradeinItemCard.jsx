import React from "react";

/**
 * Renders a single trade-in item row.
 * This component is intentionally "dumb":
 * - No API calls
 * - No state
 * - Only receives data via props
 *
 * This makes it reusable across:
 * - User dashboard
 * - Admin review
 * - Offer screens
 */
const TradeInItemCard = ({ item, onHover, renderRightExtra }) => {
  return (
    <div
      className="p-4 rounded-xl bg-black/40 border border-cyan-400/40 shadow-md hover:shadow-cyan-400 transition"
      onMouseEnter={() => onHover(item.imageUrl)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex justify-between">
        {/* Left: Card info */}
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

        {/* Right: Quantity + Value */}
        <div className="text-right">
          <p className="text-cyan-200">Qty: {item.quantity}</p>
          <p className="text-green-300">
            Est: ${item.estimatedUnitValue?.toFixed(2)}
          </p>

          {/* ADMIN SLOT */}
          {renderRightExtra && renderRightExtra(item)}
        </div>
      </div>
    </div>
  );
};

export default TradeInItemCard;
