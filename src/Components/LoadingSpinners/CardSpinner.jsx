export default function CardSpinner() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 animate-spin">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-indigo-600 rounded shadow-lg"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-cyan-500 rounded shadow-lg"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-emerald-500 rounded shadow-lg"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-pink-500 rounded shadow-lg"></div>
      </div>
    </div>
  );
}
