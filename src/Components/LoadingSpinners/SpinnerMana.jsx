export default function SpinnerMana() {
  return (
    <div className="relative w-24 h-24 animate-[spin_10s_linear_infinite] z-[-1000]">

      {/* subtle ring */}
      <div className="absolute inset-0 rounded-full border border-gray-600/30"></div>

      {/* White */}
      <div className="absolute inset-0 flex items-start justify-center animate-[spin_4s_linear_infinite_reverse]">
        <img
          src="https://svgs.scryfall.io/card-symbols/W.svg"
          className="w-6 h-6 mt-1 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        />
      </div>

      {/* Blue */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[72deg] animate-[spin_4s_linear_infinite_reverse]">
        <img
          src="https://svgs.scryfall.io/card-symbols/U.svg"
          className="w-6 h-6 mt-1 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
        />
      </div>

      {/* Black */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[144deg] animate-[spin_4s_linear_infinite_reverse]">
        <img
          src="https://svgs.scryfall.io/card-symbols/B.svg"
          className="w-6 h-6 mt-1 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* Red */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[216deg] animate-[spin_4s_linear_infinite_reverse]">
        <img
          src="https://svgs.scryfall.io/card-symbols/R.svg"
          className="w-6 h-6 mt-1 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]"
        />
      </div>

      {/* Green */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[288deg] animate-[spin_4s_linear_infinite_reverse]">
        <img
          src="https://svgs.scryfall.io/card-symbols/G.svg"
          className="w-6 h-6 mt-1 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
        />
      </div>

    </div>
  );
}
