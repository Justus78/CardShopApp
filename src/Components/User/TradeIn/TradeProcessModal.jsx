import { useState } from "react";
import { X, CreditCard, Send, Package, Eye, Banknote, BadgeCheck } from "lucide-react";
import { STEPS } from "./TradeInSteps";


const TradeProcessModal = ({ isOpen, onClose }) => {
  const [current, setCurrent] = useState(0);

  if (!isOpen) return null;

  const step = STEPS[current];
  const isLast = current === STEPS.length - 1;

  const handleNext = () => isLast ? onClose() : setCurrent(c => c + 1);
  const handleClose = () => { setCurrent(0); onClose(); };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50 p-4">
      <div className="bg-[#0f1117] border border-gray-800 border-t-2 border-t-purple-600 rounded-xl p-9 w-full max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-base font-semibold text-gray-100">How trade-ins work</h3>
            <p className="text-xs text-gray-500 mt-0.5">Walk through the process before you begin</p>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 bg-red-800 flex items-center justify-center rounded-md border border-gray-700 text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 rounded-full transition-all duration-200 ${
                i === current ? "w-8 bg-purple-500" :
                i < current  ? "w-5 bg-purple-900" : "w-5 bg-gray-800"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Step card */}
        <div className="bg-[#13161f] border border-gray-800 rounded-xl p-5 mb-5 min-h-[180px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-900/60 flex items-center justify-center text-purple-400 flex-shrink-0">
              {step.icon}
            </div>
            <span className="text-xl text-gray-600 font-mono">Step {current + 1} of {STEPS.length}</span>
          </div>
          <p className="text-lg font-semibold text-gray-100 mb-2">{step.title}</p>
          <p className="text-md text-gray-500 leading-relaxed">{step.desc}</p>
          <span className={`inline-flex items-center text-md px-2.5 py-1 rounded-full border mt-3 ${step.tag.color}`}>
            {step.tag.label}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-mono">Step {current + 1} of {STEPS.length}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrent(c => c - 1)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-700 text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors ${current === 0 ? "invisible" : ""}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 transition-colors"
            >
              {isLast ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeProcessModal;