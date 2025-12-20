import { TradeInStatus } from "./TradeInStatus";

export const TradeInStatusLabels = {
    [TradeInStatus.Draft]: "Draft",
    [TradeInStatus.Submitted]: "Submitted",
    [TradeInStatus.Estimated]: "Estimated",
    [TradeInStatus.Shipped]: "Shipped",
    [TradeInStatus.Received]: "Received",
    [TradeInStatus.UnderReview]: "Under Review",
    [TradeInStatus.OfferSent]: "Offer Sent",
    [TradeInStatus.Accepted]: "Accepted",
    [TradeInStatus.Credited]: "Credited",
    [TradeInStatus.Declined]: "Declined",
    [TradeInStatus.AutoCompleted]: "Completed",
    [TradeInStatus.Returned]: "Returned"
};
