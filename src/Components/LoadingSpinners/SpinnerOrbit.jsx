// export default function SpinnerOrbit() {
//   return (
//     <div className="relative w-16 h-16 animate-spin">
//       <div className="absolute w-3 h-3 bg-indigo-500 rounded-full top-0 left-1/2 -translate-x-1/2"></div>
//       <div className="absolute w-3 h-3 bg-white rounded-full bottom-0 left-1/2 -translate-x-1/2"></div>
//       <div className="absolute w-3 h-3 bg-green-500 rounded-full left-0 top-1/2 -translate-y-1/2"></div>
//       <div className="absolute w-3 h-3 bg-red-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
//       <div className="absolute w-3 h-3 bg-black rounded-full right-0 top-1/2 -translate-y-1/2"></div>
//     </div>
//   );
// }
export default function SpinnerOrbit() {
  return (
    <div className="relative w-16 h-16 animate-spin">
      
      {/* Blue */}
      <div className="absolute inset-0 flex items-start justify-center rotate-0">
        <div className="w-3 h-3 bg-blue-500 rounded-full -translate-y-1"></div>
      </div>

      {/* White */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[72deg]">
        <div className="w-3 h-3 bg-white border border-gray-400 rounded-full -translate-y-1"></div>
      </div>

      {/* Black */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[144deg]">
        <div className="w-3 h-3 bg-black rounded-full -translate-y-1"></div>
      </div>

      {/* Red */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[216deg]">
        <div className="w-3 h-3 bg-red-500 rounded-full -translate-y-1"></div>
      </div>

      {/* Green */}
      <div className="absolute inset-0 flex items-start justify-center rotate-[288deg]">
        <div className="w-3 h-3 bg-green-500 rounded-full -translate-y-1"></div>
      </div>

    </div>
  );
}

