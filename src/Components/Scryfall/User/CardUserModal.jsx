import React, { useState } from 'react'
import { CardCondition, FoilType, IsFoil } from "../../../Constants/enums";
import Button from '../../Button';

const CardUserModal = ({ 
    card, 
    onClose, 
    onSubmit,
    quantity,
    isFoil,
    setIsFoil,
    setQuantity,
    selectedCondition,
    setSelectedCondition,
    selectedFoilType,
    setSelectedFoilType
}) => {

    const [quantityCheck, setQuantityCheck] = useState(false);
    const [conditionCheck, setConditionCheck] = useState(false);
    const [foilCheck, setFoilCheck] = useState(false);

const isFormValid = 
  quantity > 0 &&
  selectedCondition !== "" &&
  (isFoil === "NonFoil" || (isFoil === "Foil" && (selectedFoilType && selectedFoilType !== "NonFoil")));

    console.log(isFormValid)
    console.log(selectedFoilType || "Not set Yet")
    console.log(`isFoil = ${isFoil}`)


    const img =
        card.image_uris?.normal ||
        card.card_faces?.[0]?.image_uris?.normal;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-lg border border-purple-500 
                         w-[600px] max-h-[90vh] relative flex gap-12">
                <div className='absolute top-4 right-6 flex items-center justify-center rounded-xl'>
                    <Button type={"cancel"} onClickFunction={onClose}/>
                </div>

                <div className=''>
                    <img src={img} alt={card.name} className="w-full rounded-lg mb-4" />

                    <h2 className="text-2xl font-bold text-center mb-4 text-cyan-300">{card.name}</h2>
                    <p className="text-center text-gray-400 mb-4">{card.set_name}</p>
                    <p className="text-center text-gray-400 mb-4">
                        Market Price: ${card.prices?.usd || "N/A"}
                    </p>
                </div>

                <div className='mt-10'>
                    <div className="mb-3">
                        <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-purple-500 
                                        focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                            Condition
                        </label>
                        <select
                            value={selectedCondition}
                            onChange={(e) => setSelectedCondition(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
                        >
                            <option value="">Select Condition</option>
                            {Object.entries(CardCondition).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                            Foil
                        </label>
                        <select
                            value={isFoil}
                            onChange={(e) => setIsFoil(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
                        >
                            {Object.values(IsFoil).map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>

                    {/* Foil type — only shows if user selects card is foil */}
                    <div className={isFoil === "Foil" ? "visible mb-3" : "invisible mb-3"}>
                        <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                            Foil Type
                        </label>
                        <select
                            value={selectedFoilType}
                            onChange={(e) => setSelectedFoilType(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
                        >
                            <option value="">Select Foiling</option>
                            {Object.values(FoilType).map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
   
                    </div>            
                    
                    <div className='flex gap-6'>
                        <Button type={"submit"} text={"Add"}  onClickFunction={onSubmit} buttonDisable={!isFormValid}/>
                        <Button type={"cancel"} text={"Cancel"} onClickFunction={onClose} />
                    </div>
                </div>             

            </div>
        </div>
    );
};

export default CardUserModal;
