import React, { useContext } from "react";
import CardItem from "./CardItem";
import CardItemUser from "./User/CardItemUser"
import { DataContext } from "../../Context/DataContext";

const CardGrid = ({ paginatedGroupedCards, handleAddClick, handleAddClickUser }) => {

  const { user } = useContext(DataContext);
  console.log("made it to card grid")
  return (
    <>
      {Object.entries(paginatedGroupedCards).map(([group, groupCards]) => (
        <div key={group} className="mb-10">

          {group !== "All" && (
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-400">
              {group}
            </h2>
          )}

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            { user.roles[0] === "Admin" 
            ? groupCards.map((card) => (                            
              <CardItem key={card.id} card={card} handleAddClick={handleAddClick} />
            ))
            : groupCards.map((card => (
              <CardItemUser key={card.id} card={card} handleAddClick={handleAddClick} />
            )
          ))
          }
          </div>

        </div>
      ))}
    </>
  );
};

export default CardGrid;
