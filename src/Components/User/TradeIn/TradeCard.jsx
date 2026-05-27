import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import ReviewButton from "./ReviewButton";
import TradeCodeBadge from "./TradeCodeBadge";
import StatusPill from "./StatusPill";
import ProgressBar from "./ProgressBar";

const TradeCard = ({ trade, getProgressPercent }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 transition-colors">
      <TradeCodeBadge code={trade.tradeCode} />
      <StatusPill status={trade.status} />
      <ProgressBar
        status={trade.status}
        percent={getProgressPercent(trade.status)}
      />
      <ReviewButton onClick={() => navigate(`/userViewTrade/${trade.id}`)} />
    </div>
  );
};

export default TradeCard