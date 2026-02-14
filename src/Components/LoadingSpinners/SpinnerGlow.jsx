export default function SpinnerGlow() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-30"></div>
      <div className="absolute inset-0 rounded-full border-4 border-indigo-600 animate-spin"></div>
    </div>
  );
}
