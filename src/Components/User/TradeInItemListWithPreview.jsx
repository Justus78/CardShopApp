import React, { useEffect, useRef, useState } from "react";
import TradeInItemCard from "./TradeInItemCard";
import TradeInItemActions from "./TradeInItemActions";
import TradeInItemInfo from "./TradeInItemInfo";

const TradeInItemListWithPreview = ({
  items = [],
  children,
  mode = "user", // "user" | "admin"

  // user actions
  handleIncrease,
  handleDecrease,
  handleRemoveItem,

  // admin pricing
  finalValues = {},
  onFinalValueChange,
  onFinalValueBlur,
  isLocked = false
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const hoverImage =
    items.find(i => i.id === hoveredItemId)?.imageUrl || null;

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const isAdmin = mode === "admin";

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    const handleScroll = () => {
      const image = imageRef.current;
      const container = containerRef.current;
      const imageHeight = image.offsetHeight;
      const rect = container.getBoundingClientRect();
      const topOffset = 150;

      if (rect.top + imageHeight + topOffset < window.innerHeight) {
        image.style.position = "sticky";
        image.style.top = `${topOffset}px`;
      } else if (rect.top < topOffset) {
        image.style.position = "absolute";
        image.style.top = `${container.offsetHeight - imageHeight}px`;
      } else {
        image.style.position = "relative";
        image.style.top = "0px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items]);

  return (
    <div className="flex gap-10 items-start" ref={containerRef}>
      {/* Preview */}
      <div className="flex-shrink-0 w-56" ref={imageRef}>
        <div className="w-56 h-80 border-4 border-cyan-400 rounded-lg bg-black/40 flex items-center justify-center">
          {hoverImage ? (
            <img
              src={hoverImage}
              alt="Card preview"
              className="w-full h-full object-contain rounded-md"
            />
          ) : (
            <span className="text-gray-500 text-sm text-center px-2">
              Hover a card to preview
            </span>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-3">
        {items.map(item => (
          <TradeInItemCard
            key={item.id}
            item={item}
            onHover={() => setHoveredItemId(item.id)}
            onLeave={() => setHoveredItemId(null)}
          >
            <div className="flex justify-between items-center w-full">

              {/* LEFT */}
              <TradeInItemInfo item={item} />

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                {/* ADMIN MODE */}
                {isAdmin && (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={finalValues[item.id] ?? ""}
                    disabled={isLocked}
                    onChange={(e) =>
                      onFinalValueChange?.(item.id, e.target.value)
                    }
                    onBlur={() => onFinalValueBlur?.(item.id)}
                    className={`w-24 px-2 py-1 rounded
                      ${isLocked
                        ? "bg-black border-gray-600 text-gray-500 cursor-not-allowed"
                        : "bg-black border-cyan-400 text-cyan-200"}`}
                  />
                )}

                {/* USER MODE */}
                {!isAdmin && (
                  <TradeInItemActions
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemoveItem}
                  />
                )}

              </div>

            </div>
          </TradeInItemCard>
        ))}

        {/* Bottom Actions */}
        {children && (
          <div className="pt-4 flex gap-4 justify-between">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeInItemListWithPreview;