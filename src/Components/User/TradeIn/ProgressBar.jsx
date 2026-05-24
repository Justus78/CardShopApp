import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";

const ProgressBar = ({ status, percent }) => {
  const barColor =
    percent === 100 ? "bg-emerald-500" :
    percent >= 60   ? "bg-amber-400" :
    percent >= 30   ? "bg-blue-400"  : "bg-gray-500";

  return (
    <div>
      <div className="w-full h-1 bg-gray-700/60 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-600">Submitted</span>
        <span className={`text-[10px] ${barColor.replace("bg-", "text-")}`}>
          {TradeInStatusLabels[status]}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;