// ==========================
// ScryfallHelper.js
// ==========================
import { ProductCategory } from "../Constants/enums";

// Scryfall API Search (restored: fetch all printings for all matching cards)
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
// FILTERING LOGIC
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
// GROUPING LOGIC
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
// PAGINATION LOGIC
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
// FORM DATA BUILDER ADMIN
// ==========================
// 

export const buildProductFormData = (
  card,
  price,
  inventory,
  selectedCondition,
  selectedRarity,
  selectedType,
  Category
) => {
  const formData = new FormData();

  // image from card object
  const imageUrl =
    card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;

  // ---------- PRODUCT FIELDS ----------
  formData.append("Name", card.name);
  formData.append("Description", card.oracle_text || "No description available");
  formData.append("Price", price);
  formData.append("StockQuantity", inventory);
  formData.append("ProductCategory", Category);
  formData.append("ProductImage", imageUrl || "");
  formData.append("BestSeller", "false"); // default



  // ---------- CARD DETAIL FIELDS ----------
  if (Category === ProductCategory.Card) {
    if (card.set_name) formData.append("CardDetails.SetName", card.set_name);
    if (card.collector_number) formData.append("CardDetails.CollectionNumber", card.collector_number);
    formData.append("CardDetails.IsFoil", card.foil ? "true" : "false");

    if (selectedCondition) formData.append("CardDetails.CardCondition", selectedCondition);
    if (selectedRarity) formData.append("CardDetails.CardRarity", selectedRarity);
    if (selectedType) formData.append("CardDetails.CardType", selectedType);
  }

  return formData;
};


// =====================================
// FORM DATA BUILDER USER TRADE IN ITEM
// =====================================

export const buildTradeInFormData = (
  card,
  quantity,
  selectedCondition,
  FoilType,
  IsFoil
) => {

  const formData = new FormData();

  const imageUrl =
    card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;

  formData.append("CardName", card.name);
  formData.append("SetCode", card.set_name || "");
  formData.append("Quantity", quantity);
  formData.append("ImageUrl", imageUrl || "")
  formData.append("FoilType", FoilType)

  if (IsFoil === "Foil") {formData.append("IsFoil", true)} else {formData.append("IsFoil", false)} 

  if (selectedCondition) formData.append("CardCondition", selectedCondition);

    for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  return formData;
};
