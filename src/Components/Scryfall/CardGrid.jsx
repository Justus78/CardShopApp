import React from "react";
import CardItem from "./CardItem";

const CardGrid = ({ groupedCards, onCardClick }) => {
  return (
    <>
      {Object.entries(groupedCards).map(([group, cards]) => (
        <div key={group} className="mb-10">

          {group !== "All" && (
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-400">
              {group}
            </h2>
          )}

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} onClick={onCardClick} />
            ))}
          </div>

        </div>
      ))}
    </>
  );
};

export default CardGrid;
