import { TradeInStatusColors } from "../../../Context/Constants/TradeInStatusColors";
import { TradeInStatusDotColors } from "../../../Context/Constants/TradeInStatusDotColors";
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";

const StatusPill = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${TradeInStatusColors[status]}`}
  >
    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${TradeInStatusDotColors[status]}`} />
    {TradeInStatusLabels[status]}
  </span>
);

export default StatusPill;