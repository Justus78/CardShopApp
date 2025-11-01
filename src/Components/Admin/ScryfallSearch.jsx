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

  console.log(selectedCard)

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
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-lg">
        ✨ Scryfall Search ✨
      </h1>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto mb-8 flex items-center gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Magic cards..."
          className="flex-1 p-3 bg-gray-900 border border-purple-500 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:shadow-[0_0_10px_#9333ea]"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
        >
          Search
        </button>
      </form>

      {/* Sort & Group Controls */}
      <div className="max-w-2xl mx-auto flex gap-4 mb-6">
        <select
          className="flex-1 bg-gray-900 border border-purple-500 rounded-xl text-white p-2 focus:ring-2 focus:ring-cyan-500"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="set_name">Sort by Set</option>
          <option value="rarity">Sort by Rarity</option>
        </select>
        <select
          className="flex-1 bg-gray-900 border border-purple-500 rounded-xl text-white p-2 focus:ring-2 focus:ring-cyan-500"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <option value="">No Grouping</option>
          <option value="set_name">Group by Set</option>
          <option value="rarity">Group by Rarity</option>
        </select>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-center text-cyan-300 text-lg">Loading cards...</p>}
      {error && <p className="text-center text-red-400 font-medium mb-6">{error}</p>}

      {/* Cards */}
      {Object.entries(paginatedGroupedCards).map(([group, groupCards]) => (
        <div key={group} className="mb-10">
          {group !== "All" && (
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-400">
              {group}
            </h2>
          )}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {groupCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleAddClick(card)}
                className="relative bg-gray-900 bg-opacity-70 border border-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-[0_0_20px_#9333ea] transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>
                <img
                  src={
                    card.image_uris?.normal ||
                    card.card_faces?.[0]?.image_uris?.normal
                  }
                  alt={card.name}
                  className="w-full rounded mb-3"
                />
                <h2 className="font-semibold text-lg text-purple-300">{card.name}</h2>
                <p className="text-sm text-gray-400">{card.set_name}</p>
                <p className="text-cyan-400 text-sm italic capitalize">{card.rarity}</p>
                <p className="text-sm mt-1">${card.prices.usd || card.prices.usd_foil || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

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

      {/* Add to inventory modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg border border-purple-500 w-80 sm:w-96 max-w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              ✖
            </button>

            {/* Card Image */}
            <img
              src={
                selectedCard.image_uris?.normal ||
                selectedCard.card_faces?.[0]?.image_uris?.normal
              }
              alt={selectedCard.name}
              className="w-full rounded-lg mb-4"
            />

            {/* Card Info */}
            <h2 className="text-2xl font-bold text-center mb-3 text-cyan-300">
              {selectedCard.name}
            </h2>
            <p className="text-center text-gray-400 mb-2">{selectedCard.set_name}</p>
            <p className="text-center text-gray-400 mb-4">
              Market Price: ${selectedCard.prices.usd}
            </p>

            {/* Form Inputs */}
            <div className="space-y-3">
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500 focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500 focus:ring-2 focus:ring-cyan-500"
              />

              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500"
              >
                <option value="">Select Condition</option>
                {Object.values(CardCondition).map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>

              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500"
              >
                <option value="">Select Rarity</option>
                {Object.values(CardRarity).map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-purple-500"
              >
                <option value="">Select Type</option>
                {Object.values(CardType).map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Add to Inventory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ScryfallSearch;
