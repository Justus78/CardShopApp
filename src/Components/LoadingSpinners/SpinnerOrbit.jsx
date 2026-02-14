export default function SpinnerOrbit() {
  return (
    <div className="relative w-16 h-16 animate-spin">
      <div className="absolute w-3 h-3 bg-indigo-500 rounded-full top-0 left-1/2 -translate-x-1/2"></div>
      <div className="absolute w-3 h-3 bg-cyan-500 rounded-full bottom-0 left-1/2 -translate-x-1/2"></div>
      <div className="absolute w-3 h-3 bg-emerald-500 rounded-full left-0 top-1/2 -translate-y-1/2"></div>
      <div className="absolute w-3 h-3 bg-pink-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
    </div>
  );
}
