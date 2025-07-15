import React, { useState } from "react";

const ScryfallSearch = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setCards([]);

    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (res.ok && data.data?.length) {
        setCards(data.data);
      } else if (data.object === "error") {
        setError(data.details || "An error occurred while searching.");
      } else {
        setError("No cards found for that search.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch cards. Please check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
        <div className="flex shadow-sm">
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
        </div>
      </form>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading cards...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium mb-6">{error}</p>
      )}

      {!loading && !error && cards.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal}
                alt={card.name}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{card.name}</h2>
                <p className="text-sm text-gray-600">Set: {card.set_name}</p>
                {card.mana_cost && (
                  <p className="text-sm text-gray-600">Mana Cost: {card.mana_cost}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScryfallSearch;
