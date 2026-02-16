// src/components/ManaSymbol.jsx
import React from "react";

// Dynamically import all SVGs in the mana-symbols folder
const svgs = import.meta.glob('../assets/mana_symbols/*.svg', { eager: true, import: "default" });
console.log("Loaded SVGs:", Object.keys(svgs));


const ManaSymbol = ({ symbol, size = 24, alt }) => {
  // Remove braces if present: "{T}" -> "T"
  const cleanSymbol = symbol.replace(/[{}]/g, "");

  // Try to find the SVG
  const Svg = svgs[`../assets/mana_symbols/${cleanSymbol}.svg`];

  if (!Svg) return <span style={{ fontSize: size }}>?</span>; // fallback if missing

  return (
    <img
      src={Svg}
      alt={alt || cleanSymbol}
      width={size}
      height={size}
      style={{ verticalAlign: "middle" }}
    />
  );
};

export default ManaSymbol;
