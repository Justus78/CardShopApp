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

import {
  handleScryfallSearch,
  filterCards,
  groupCards,
  paginateGroups,
  buildProductFormData
} from "../../Helpers/ScryfallHelper";

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

  // 🔍 Search handler
  const handleSearch = async (e) => {
    e.preventDefault();

    handleScryfallSearch(query, {
      setLoading,
      setError,
      setCards,
      setCurrentPage
    });
  };

  // 🎴 Filter, group, and paginate cards using helpers
  const filteredCards = filterCards(cards, selectedRarity, selectedType, sortOrder);
  const groupedCards = groupCards(filteredCards, groupBy);
  const paginatedGroupedCards = paginateGroups(groupedCards, currentPage, PAGE_SIZE);

  const totalCardsCount = filteredCards.length;
  const totalPages = Math.ceil(totalCardsCount / PAGE_SIZE);

  // 🧱 Open modal and reset form fields
  const handleAddClick = (card) => {
    setSelectedCard(card);
    setPrice("");
    setInventory("");
    setSelectedCondition("");
    setSelectedRarity("");
    setSelectedType("");
  };

  // 💾 Submit modal form
  const handleSubmit = async () => {
    if (!price || !inventory || isNaN(price) || isNaN(inventory)) {
      toast.error("Please enter valid price and stock quantity.");
      return;
    }

    try {
      const formData = buildProductFormData(
        selectedCard,
        price,
        inventory,
        selectedCondition,
        selectedRarity,
        selectedType,
        ProductCategory
      );

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

      {/* 🔍 Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      {/* 🔽 Sorting / Grouping */}
      <SortingControls
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />

      {/* Loading & Errors */}
      {loading && <p className="text-center text-cyan-300 text-lg">Loading cards...</p>}
      {error && <p className="text-center text-red-400 font-medium mb-6">{error}</p>}

      {/* 🎴 Cards */}
      <CardGrid
        paginatedGroupedCards={paginatedGroupedCards}
        handleAddClick={handleAddClick}
      />

      {/* 🔄 Pagination */}
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

      {/* 🧱 Add to Inventory Modal */}
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
