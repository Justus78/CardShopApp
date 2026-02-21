import { useEffect, useState } from "react";
import { symbols } from "../../assets/mana_symbols/symbols";

export default function SpinnerMana() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate parallax offsets
  const offsetX = (mousePos.x - window.innerWidth / 2) / 50;
  const offsetY = (mousePos.y - window.innerHeight / 2) / 50;

  return (
    <div
      className="relative w-36 h-36 flex items-center justify-center z-[-1000]"
      style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
    >
      {/* Outer faint glow ring */}
      <div className="absolute inset-0 rounded-full border border-indigo-500/20 blur-sm"></div>

      {/* Outer rotating ring */}
      <div className="absolute inset-2 rounded-full border border-indigo-500/30 animate-[spin_20s_linear_infinite]"></div>

      {/* Inner rotating ring (reverse) */}
      <div className="absolute inset-6 rounded-full border border-cyan-400/30 animate-[spin_12s_linear_infinite_reverse]"></div>

      {/* Mana symbols orbit container */}
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
        {[
          { symbol: symbols.W, rotate: 0, shadow: "rgba(255,255,255,0.9)" },
          { symbol: symbols.U, rotate: 72, shadow: "rgba(59,130,246,0.9)" },
          { symbol: symbols.B, rotate: 144, shadow: "rgba(0,0,0,0.9)" },
          { symbol: symbols.R, rotate: 216, shadow: "rgba(239,68,68,0.9)" },
          { symbol: symbols.G, rotate: 288, shadow: "rgba(34,197,94,0.9)" },
        ].map((dot, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-start justify-center rotate-[${dot.rotate}deg] animate-[spin_4s_linear_infinite_reverse]`}
          >
            <img
              src={dot.symbol}
              className={`w-8 h-8 mt-2 drop-shadow-[0_0_8px_${dot.shadow}] animate-pulse`}
            />
          </div>
        ))}
      </div>

      {/* Center glow core */}
      <div className="w-4 h-4 bg-indigo-500 rounded-full blur-sm animate-pulse"></div>
    </div>
  );
}
