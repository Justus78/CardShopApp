import React, { useState, useEffect } from "react";
import { CardCondition, CardConditionMap } from "../../../Constants/enums";
import { FoilType } from "../../../Constants/enums";
import { GetScryfallCard } from "../../../Helpers/ScryfallHelper";
import { toast } from "react-toastify";

const TradeInItemInfo = ({ item, isAdmin }) => {

  const [error, setError] = useState(null);
  const [scryfallCard, setScryfallCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardPrice, setCardPrice] = useState(null);
  console.log(item.condition)
  useEffect(() => {
    const getScryId = async () => {
      if(item.scryfallId){
        try{
          setLoading(true)
          await GetScryfallCard(item.scryfallId, setScryfallCard, setError)

        }catch (err) {
          setError(err.message)
          toast.error(err.message)
          console.log(err.message)
        } finally {
          setLoading(false)
        }
      }
    }
    getScryId();
  },[])

    useEffect(() => {
      if (!scryfallCard) return; //  bail out until data arrives

      if (item.foilType === 0) {
        setCardPrice(scryfallCard.prices.usd)
      } else if (item.foilType === 4) {
        setCardPrice(scryfallCard.prices.usd_etched ?? scryfallCard.prices.usd_foil)
      } else {
        setCardPrice(scryfallCard.prices.usd_foil)
      }
    }, [scryfallCard]) // runs whenever scryfallCard is set

  // console.log(scryfallCard)
  
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
        <p className="text-cyan-300 font-bold text-lg mb-1">
          {item.cardName} ({item.foilType ?`${FoilType[item.foilType]} Foil` : "Non-Foil"})
        </p>

        <p className="text-purple-300 text-sm mb-1">
          Set: {item.setCode}
        </p>

        <p className="text-pink-300 text-sm mb-1">
          Condition: {CardCondition[item.condition]}
        </p>

        {scryfallCard && isAdmin ?
        <p className="text-pink-300 text-sm">
         Price: {cardPrice || "no price found."}
        </p> : null}

      </div>
    </div>
  );
};

export default TradeInItemInfo;