// ==========================
// 📁 ScryfallHelper.js
// ==========================

// 🔍 Scryfall API Search (restored: fetch all printings for all matching cards)
export const handleScryfallSearch = async (
  query,
  { setLoading, setError, setCards, setCurrentPage }
) => {
  if (!query.trim()) {
    setError("Please enter a search term.");
    return;
  }

  setLoading(true);
  setError("");
  setCards([]);
  setCurrentPage(1);

  try {
    // Search Scryfall for all cards matching the query
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards`
    );
    const data = await res.json();

    if (data.object === "error") {
      setError(data.details || "Something went wrong.");
      return;
    }

    // Fetch all printings for each matching card
    let allPrintings = [];
    for (const card of data.data) {
      const printsRes = await fetch(card.prints_search_uri);
      const printsData = await printsRes.json();
      allPrintings.push(...printsData.data);
    }

    setCards(allPrintings);
  } catch (err) {
    console.error(err);
    setError("Error fetching cards. Please try again later.");
  } finally {
    setLoading(false);
  }
};

// ==========================
// 🎴 FILTERING LOGIC
// ==========================
export const filterCards = (cards, selectedRarity, selectedType, sortOrder) => {
  return cards
    .filter((card) =>
      selectedRarity ? card.rarity === selectedRarity.toLowerCase() : true
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
};

// ==========================
// 📦 GROUPING LOGIC
// ==========================
export const groupCards = (filteredCards, groupBy) => {
  if (!groupBy) return { All: filteredCards };

  return filteredCards.reduce((acc, card) => {
    const key = card[groupBy] || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(card);
    return acc;
  }, {});
};

// ==========================
// 📄 PAGINATION LOGIC
// ==========================
export const paginateGroups = (groupedCards, currentPage, pageSize) => {
  const paginated = {};

  Object.entries(groupedCards).forEach(([group, cards]) => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    paginated[group] = cards.slice(start, end);
  });

  return paginated;
};

// ==========================
// 🧱 FORM DATA BUILDER
// ==========================
export const buildProductFormData = (
  card,
  price,
  inventory,
  selectedCondition,
  selectedRarity,
  selectedType,
  ProductCategory
) => {
  const formData = new FormData();

  const imageUrl =
    card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;

  formData.append("Name", card.name);
  formData.append("Description", card.oracle_text || "No description available");
  formData.append("Price", price);
  formData.append("StockQuantity", inventory);
  formData.append("ProductCategory", ProductCategory.Card);
  formData.append("SetName", card.set_name || "");
  formData.append("CollectionNumber", card.collector_number || "");
  formData.append("IsFoil", card.foil ? "true" : "false");
  formData.append("ProductImage", imageUrl || "");

  if (selectedCondition) formData.append("CardCondition", selectedCondition);
  if (selectedRarity) formData.append("CardRarity", selectedRarity);
  if (selectedType) formData.append("CardType", selectedType);

  return formData;
};
