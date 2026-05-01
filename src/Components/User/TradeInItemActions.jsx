import React from "react";

const TradeInItemActions = ({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const total =
    (item.quantity || 0) * (item.estimatedUnitValue || 0);

  return (
    <div className="text-right">

      {/* Quantity Controls */}
      <div className="flex items-center justify-end gap-2 mb-2">
        {onIncrease ? 
          <button
            onClick={() => onDecrease?.(item)}
            className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">
                -
          </button>        
        : 
          null}

     

        <span className="text-cyan-200">
          {item.quantity}
        </span>

          {onDecrease ? 
            <button
              onClick={() => onIncrease?.(item)}
              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              +
            </button>
            
            :
             null
          }


      </div>

      {/* Pricing */}
      <p className="text-green-300">
        Trade Credit: ${item.estimatedUnitValue?.toFixed(2) ?? "0.00"}
      </p>

      <p className="text-green-400 font-semibold">
        Total: ${total.toFixed(2)}
      </p>

      {/* Delete */}
      {onRemove ?       
        <button
          onClick={() => onRemove?.(item)}
          className="mt-2 text-red-400 hover:text-red-300 text-sm"
        >
          Remove
        </button> : null
      }


    </div>
  );
};

export default TradeInItemActions;