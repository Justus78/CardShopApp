import { useNavigate } from "react-router-dom";
import ReviewButton from "./ReviewButton";
import TradeCodeBadge from "./TradeCodeBadge";
import StatusPill from "./StatusPill";
import ProgressBar from "./ProgressBar";
import { TradeInStatusLabels } from "../../../Context/Constants/TradeInStatusLabels";
import { TradeInStatusTabColors } from "../../../Context/Constants/TradeInStatusTabColors";
import Button from "../../Button";

const TradeCard = ({ trade, getProgressPercent }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col cursor-pointer group">
      {/* Folder tab */}
      <div className={`h-6 w-4/9  flex items-center px-3 text-xs rounded-t-xl font-medium ${TradeInStatusTabColors[trade.status]} `}>
        {TradeInStatusLabels[trade.status]}
        {/* <TradeCodeBadge code={trade.tradeCode}/> */}
      </div>

      {/* Folder body */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-tr-xl p-4 flex flex-col gap-3 group-hover:border-white/20 transition-colors">
        <TradeCodeBadge code={trade.tradeCode} />
        <StatusPill status={trade.status} width={'w-2/5'}/>
        <ProgressBar
          status={trade.status}
          percent={getProgressPercent(trade.status)}
        />
        <Button onClickFunction={() => navigate(`/userViewTrade/${trade.id}`)}  type="review" text={"Review"}/>
      </div>
    </div>
  );
};

export default TradeCard;