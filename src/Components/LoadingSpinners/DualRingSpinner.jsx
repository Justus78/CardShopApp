export default function SpinnerDual() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-4 border-transparent border-b-cyan-500 rounded-full animate-spin"></div>
    </div>
  );
}
