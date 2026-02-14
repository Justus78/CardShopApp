export default function SpinnerDots() {
  return (
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:.2s]"></div>
      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:.4s]"></div>
    </div>
  );
}
