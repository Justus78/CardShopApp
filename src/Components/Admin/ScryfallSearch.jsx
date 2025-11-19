import React, { useContext, useState } from "react";
import { createProduct } from "../../services/productService";
import { toast } from "react-toastify";
import {
  ProductCategory,
  CardCondition,
  CardRarity,
  CardType,
} from "../../Constants/enums";
import { DataContext } from "../../Context/DataContext";
import SearchBar from "../Scryfall/SearchBar";
import SortingControls from "../Scryfall/SortingControls";
import CardGrid from "../Scryfall/CardGrid";
import CardModalAdmin from "../Scryfall/CardModalAdmin";

const PAGE_SIZE = 20;

const ScryfallSearch = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [groupBy, setGroupBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useContext(DataContext);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setCards([]);
    setCurrentPage(1);

    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards`
      );
      const data = await res.json();

      if (data.object === "error") {
        setError(data.details || "Something went wrong.");
      } else {
        let allPrintings = [];
        for (const card of data.data) {
          const printsRes = await fetch(card.prints_search_uri);
          const printsData = await printsRes.json();
          allPrintings.push(...printsData.data);
        }
        setCards(allPrintings);
      }
    } catch (err) {
      setError("Error fetching cards. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const filteredCards = cards
    .filter((card) => (selectedRarity ? card.rarity === selectedRarity.toLowerCase() : true))
    .filter((card) => (selectedType ? card.type_line?.includes(selectedType) : true))
    .sort((a, b) => {
      if (sortOrder === "name") return a.name.localeCompare(b.name);
      if (sortOrder === "set_name") return a.set_name.localeCompare(b.set_name);
      if (sortOrder === "rarity") return a.rarity.localeCompare(b.rarity);
      return 0;
    });

  const groupedCards = groupBy
    ? filteredCards.reduce((acc, card) => {
        const key = card[groupBy] || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(card);
        return acc;
      }, {})
    : { All: filteredCards };

  const paginatedGroupedCards = {};
  Object.entries(groupedCards).forEach(([group, cards]) => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    paginatedGroupedCards[group] = cards.slice(start, end);
  });

  const totalCardsCount = filteredCards.length;
  const totalPages = Math.ceil(totalCardsCount / PAGE_SIZE);

  const handleAddClick = (card) => {
    setSelectedCard(card);
    setPrice("");
    setInventory("");
    setSelectedCondition("");
    setSelectedRarity("");
    setSelectedType("");
  };

  const handleSubmit = async () => {
    if (!price || !inventory || isNaN(price) || isNaN(inventory)) {
      toast.error("Please enter valid price and stock quantity.");
      return;
    }

    try {
      const formData = new FormData();
      const imageUrl =
        selectedCard.image_uris?.normal ||
        selectedCard.card_faces?.[0]?.image_uris?.normal;

      formData.append("Name", selectedCard.name);
      formData.append("Description", selectedCard.oracle_text || "No description available");
      formData.append("Price", price);
      formData.append("StockQuantity", inventory);
      formData.append("ProductCategory", ProductCategory.Card);
      formData.append("SetName", selectedCard.set_name || "");
      formData.append("CollectionNumber", selectedCard.collector_number || "");
      formData.append("IsFoil", selectedCard.foil ? "true" : "false");
      formData.append("ProductImage", imageUrl || "");

      if (selectedCondition) formData.append("CardCondition", selectedCondition);
      if (selectedRarity) formData.append("CardRarity", selectedRarity);
      if (selectedType) formData.append("CardType", selectedType);

      await createProduct(formData);
      toast.success("Product added successfully!");
      setSelectedCard(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6">
      
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch}/>

      <SortingControls sortOrder={sortOrder} setSortOrder={setSortOrder} groupBy={groupBy} setGroupBy={setGroupBy} />

      {/* Loading/Error */}
      {loading && <p className="text-center text-cyan-300 text-lg">Loading cards...</p>}
      {error && <p className="text-center text-red-400 font-medium mb-6">{error}</p>}

      {/* Cards */}
      <CardGrid paginatedGroupedCards={paginatedGroupedCards} handleAddClick={handleAddClick} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`px-4 py-2 rounded-xl ${
              currentPage === 1
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105"
            } transition-all`}
          >
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={`px-4 py-2 rounded-xl ${
              currentPage === totalPages
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105"
            } transition-all`}
          >
            Next
          </button>
        </div>
      )}
     
      {/*Add to inventory MODAL */}
      {selectedCard && (
        <CardModalAdmin
          card={selectedCard}
          price={price}
          inventory={inventory}
          selectedCondition={selectedCondition}
          selectedRarity={selectedRarity}
          selectedType={selectedType}
          setPrice={setPrice}
          setInventory={setInventory}
          setSelectedCondition={setSelectedCondition}
          setSelectedRarity={setSelectedRarity}
          setSelectedType={setSelectedType}
          onClose={() => setSelectedCard(null)}
          onSubmit={handleSubmit}
          cardConditions={CardCondition}
          cardRarities={CardRarity}
          cardTypes={CardType}
        />
      )}

    </div>
  );
};

export default ScryfallSearch;


