import React, { useState } from "react";
import { createProduct } from "../../services/productService";
import { toast } from "react-toastify";
import {
  ProductCategory,
  CardCondition,
  CardRarity,
  CardType,
} from "../../Constants/enums";

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setCards([]);
    setCurrentPage(1);

    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
          query
        )}&unique=cards`
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

  // Filtering, sorting logic
  const filteredCards = cards
    .filter((card) =>
      selectedRarity ? card.rarity === selectedRarity.toLowerCase() : true
    )
    .filter((card) =>
      selectedCondition ? card.condition === selectedCondition : true
    )
    .filter((card) =>
      selectedType ? card.type_line?.includes(selectedType) : true
    )
    .sort((a, b) => {
      if (sortOrder === "name") return a.name.localeCompare(b.name);
      if (sortOrder === "set_name") return a.set_name.localeCompare(b.set_name);
      if (sortOrder === "rarity") return a.rarity.localeCompare(b.rarity);
      return 0;
    });

  // Group cards (if grouping enabled)
  const groupedCards = groupBy
    ? filteredCards.reduce((acc, card) => {
        const key = card[groupBy] || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(card);
        return acc;
      }, {})
    : { All: filteredCards };

  // Pagination helper for grouped cards:
  // Returns only the cards for the current page in each group
  const paginatedGroupedCards = {};
  Object.entries(groupedCards).forEach(([group, cards]) => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    paginatedGroupedCards[group] = cards.slice(start, end);
  });

  // Calculate total pages across all cards (ignoring grouping for simplicity)
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
      alert("Please enter valid price and stock quantity.");
      return;
    }

    try {
      const formData = new FormData();

      const imageUrl =
        selectedCard.image_uris?.normal ||
        selectedCard.card_faces?.[0]?.image_uris?.normal;

      formData.append("Name", selectedCard.name);
      formData.append(
        "Description",
        selectedCard.oracle_text || "No description available"
      );
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
    <div className="min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto mb-6 flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Magic cards..."
          className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 rounded-r-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>

      {/* Sort & Group Controls */}
      <div className="max-w-xl mx-auto flex gap-4 mb-6">
        <select
          className="p-2 border rounded flex-1"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort cards"
        >
          <option value="name">Sort by Name</option>
          <option value="set_name">Sort by Set</option>
          <option value="rarity">Sort by Rarity</option>
        </select>
        <select
          className="p-2 border rounded flex-1"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          aria-label="Group cards"
        >
          <option value="">No Grouping</option>
          <option value="set_name">Group by Set</option>
          <option value="rarity">Group by Rarity</option>
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading cards...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium mb-6">{error}</p>
      )}

      {/* Cards display grouped & paginated */}
      {Object.entries(paginatedGroupedCards).map(([group, groupCards]) => (
        <div key={group} className="mb-8 w-full mx-auto">
          {group !== "All" && (
            <h2 className="text-xl font-semibold mb-4 text-center capitalize">
              {group}
            </h2>
          )}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {groupCards.map((card) => (
              <div
                key={card.id}
                className="bg-white shadow-md rounded-lg w-75 overflow-hidden cursor-pointer"
                onClick={() => handleAddClick(card)}
              >
                <img
                  src={
                    card.image_uris?.normal ||
                    card.card_faces?.[0]?.image_uris?.normal ||
                    "https://via.placeholder.com/150"
                  }
                  alt={card.name}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{card.name}</h2>
                  <p className="text-sm text-gray-600">Set: {card.set_name}</p>
                  {card.mana_cost && (
                    <p className="text-sm text-gray-600">Mana Cost: {card.mana_cost}</p>
                  )}
                  <p className="text-sm capitalize">Rarity: {card.rarity}</p>
                  <p className="text-sm capitalize">Foil: {card.foil.toString()}</p>
                  <p className="text-sm capitalize">${card.prices.usd || card.prices[0]}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddClick(card);
                    }}
                    className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                  >
                    Add to Inventory
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-xl mx-auto flex justify-center items-center space-x-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/** pop up menu for when adding selected card to inventory */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Add &quot;{selectedCard.name}&quot; CM: ${ selectedCard.prices.usd || selectedCard.prices[0]}</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Condition</option>
                {Object.values(CardCondition).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Rarity</label>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Rarity</option>
                {Object.values(CardRarity).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Type</option>
                {Object.values(CardType).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScryfallSearch;
