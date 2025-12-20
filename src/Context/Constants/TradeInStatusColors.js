import { TradeInStatus } from "./TradeInStatus";

export const TradeInStatusColors = {
    [TradeInStatus.Draft]: "text-gray-400",
    [TradeInStatus.Submitted]: "text-blue-400",
    [TradeInStatus.Estimated]: "text-purple-400",
    [TradeInStatus.Shipped]: "text-cyan-400",
    [TradeInStatus.Received]: "text-green-400",
    [TradeInStatus.UnderReview]: "text-yellow-400",
    [TradeInStatus.OfferSent]: "text-pink-400",
    [TradeInStatus.Accepted]: "text-green-500",
    [TradeInStatus.Credited]: "text-emerald-400",
    [TradeInStatus.Declined]: "text-red-500",
    [TradeInStatus.AutoCompleted]: "text-emerald-600",
    [TradeInStatus.Returned]: "text-orange-400"
};
