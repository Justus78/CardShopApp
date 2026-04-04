import {
  FaClock,
  FaPaperPlane,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaSearch,
  FaDollarSign,
} from "react-icons/fa";

export const ProductCategory = {
  Card: "Card",
  Sealed: "Sealed",
  Accessory: "Accessory",
  Bundle: "Bundle"
};

export const CardRarity = {
  Common: "Common",
  Uncommon: "Uncommon",
  Rare: "Rare",
  Mythic: "Mythic"
};

export const CardCondition = {
  0: "Mint",
  1: "Near Mint",
  2: "Lightly Played",
  3: "Moderately Played",
  4: "Heavily Played",
  5: "Damaged"
};

// mapping object for card condition
export const CardConditionMap = {
  "Mint": "Mint",
  "Near Mint": "NearMint",
  "Lightly Played": "LightlyPlayed",
  "Moderately Played": "ModeratelyPlayed",
  "Heavily Played": "HeavilyPlayed",
  "Damaged": "Damaged"
};

export const CardType = {
  Creature: "Creature",
  Instant: "Instant",
  Sorcery: "Sorcery",
  Artifact: "Artifact",
  Enchantment: "Enchantment",
  Planeswalker: "Planeswalker",
  Land: "Land"
};

export const FoilType = {
  NonFoil: "NonFoil",
  Regular: "Regular",
  Textured: "Textured",
  Mana: "Mana",
  Etched: "Etched",
  Surge: "Surge",
  Other: "Other"
}

export const IsFoil = {
  Foil: "Foil",
  NonFoil: "NonFoil"
}

export const TradeInStatusIcons = {
  0: <FaClock />,         // Draft
  1: <FaPaperPlane />,    // Submitted
  2: <FaDollarSign />,    // Estimated
  3: <FaTruck />,         // Shipped
  4: <FaBox />,           // Received
  5: <FaSearch />,        // Under Review
  6: <FaDollarSign />,    // Offer Sent
  7: <FaCheckCircle />,   // Accepted
  8: <FaCheckCircle />,   // Credited
  9: <FaTimesCircle />,   // Declined
  10: <FaCheckCircle />,  // Auto Completed
  11: <FaBox />,          // Returned
};
