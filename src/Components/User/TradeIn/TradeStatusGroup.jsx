import React from 'react'
import TradeCard from './TradeCard';
import { TradeInStatusDotColors } from '../../../Context/Constants/TradeInStatusDotColors';
import { TradeInStatusLabels } from '../../../Context/Constants/TradeInStatusLabels';

const TradeStatusGroup = ({ status, trades, getProgressPercent }) => (
  <div className="mb-8">
    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-3">
      <span className={`w-2 h-2 rounded-full ${TradeInStatusDotColors[status]}`} />
      {TradeInStatusLabels[status]}
      <span className="text-gray-600 font-normal">({trades.length})</span>
    </h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} getProgressPercent={getProgressPercent} />
      ))}
    </div>
  </div>
);

export default TradeStatusGroup