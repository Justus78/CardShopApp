import React, { useEffect, useRef, useState } from "react";
import TradeInItemCard from "./TradeinItemCard";
/**
 * Reusable trade-in list with sticky preview.
 * Buttons are injected by the parent via `children`.
 */
const TradeInItemListWithPreview = ({ items = [], children }) => {
  const [hoverImage, setHoverImage] = useState(null);

  const imageRef = useRef(null);
  const containerRef = useRef(null);

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
      {/* Sticky Preview */}
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

      {/* Items + injected actions */}
      <div className="flex-1 space-y-3">
        {items.map(item => (
          <TradeInItemCard
            key={item.id}
            item={item}
            onHover={setHoverImage}
          />
        ))}

        {/* 🔑 Action Slot */}
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
