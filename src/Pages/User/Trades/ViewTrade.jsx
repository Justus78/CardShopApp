import ConfirmModal from "../../../Components/ConfirmModal";
import Navbar from "../../../Components/User/Navbar"
import Footer from "../../../Components/User/Footer"
import TableHeader from "../../../Components/Admin/TableHeader";
import StatusPill from "../../../Components/User/TradeIn/StatusPill";
import MetaSummaryPill from "../../../Components/User/TradeIn/MetaSummaryPill";
import LoadingOverlay from "../../../Components/LoadingSpinners/LoadingOverlay"
import TradeCodeBadge from "../../../Components/User/TradeIn/TradeCodeBadge";
import TradeInItemListWithPreview from "../../../Components/User/TradeIn/TradeInItemListWithPreview";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTradeInById } from "../../../Services/TradeInService";
import { toast } from "react-toastify";
import { acceptTradeInOffer, declineTradeInOffer } from "../../../Services/TradeInService";

const ViewTrade = () => {

  const { id } = useParams();

  const [trade, setTrade] = useState(null);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
  });

  const navigate = useNavigate();

  const LoadTrade = async () => {
    try {
      setLoading(true);
      const res = await getTradeInById(id);
      setTrade(res);
    } catch (err) {
      console.log(err);
      setError(err.message || "failed to load trade.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadTrade();
  }, []);

  const AcceptOffer = async () => {
    try {
      setLoading(true);
      await acceptTradeInOffer(id);
      LoadTrade();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const DeclineOffer = async () => {
    try {
      setLoading(true);
      await declineTradeInOffer(id);
      LoadTrade();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openConfirm = (type) => setConfirmModal({ isOpen: true, type });
  const closeConfirm = () => setConfirmModal({ isOpen: false, type: null });

  const handleConfirm = async () => {
    closeConfirm();
    console.log(confirmModal.type)
    if (confirmModal.type === "accept") await AcceptOffer();
    if (confirmModal.type === "decline") await DeclineOffer();
  };

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6">
        <div className="min-h-screen text-white pt-28">
          <div className="max-w-6xl mx-auto p-6">
            <TableHeader title={"View Trade Status"} />
            <div className="flex gap-4 m-4">
              <button
                onClick={() => navigate("/userTrade")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate(`/userTradeSubmitted/${trade.tradeCode}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-700 hover:bg-orange-500 border border-purple-500 text-purple-100 text-sm font-semibold rounded-lg transition-colors"
              >
                View Instructions
              </button>
            </div>

            {trade && (
              <section className="mb-12">
                <div className="bg-white/5 backdrop-blur-sm border border-gray-800 border-t-2 mb-3 border-t-purple-600 rounded-xl p-6">
                  <div className="flex gap-4 mb-2">
                    <TradeCodeBadge code={trade.tradeCode} />
                    <StatusPill status={trade.status} />
                  </div>

                  <p>
                    <strong>Started:</strong>{" "}
                    {new Date(trade.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-2">
                    {trade.finalValue ? (
                      <span className="font-bold text-green-400">
                        <strong>Offer Amount:</strong> ${trade.finalValue}
                      </span>
                    ) : (
                      <span className="text-white">
                        <strong>Offer:</strong> Still Processing
                      </span>
                    )}

                    {trade.status === 6 && trade.finalValue > 0 && (
                      <div className="pt-4 flex gap-4">
                        <button
                          onClick={() => openConfirm("accept")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-gray-800 border border-gray-600 text-gray-300 text-sm font-semibold rounded-lg transition-colors"
                        >
                          Accept Offer
                        </button>
                        <button
                          onClick={() => openConfirm("decline")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-red-950/40 border border-red-900/60 text-red-400 text-sm font-semibold rounded-lg transition-colors ml-auto"
                        >
                          Decline Offer
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-gray-800 border-t-2 border-t-purple-600 rounded-xl p-6">
                  <TradeInItemListWithPreview
                    items={trade.items}
                    status={trade.status}
                    mode="user"
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === "accept" ? "Accept Offer" : "Decline Offer"}
        message={
          confirmModal.type === "accept"
            ? `Are you sure you want to accept the offer of $${trade?.finalValue} trade credit? This action cannot be undone.`
            : "Are you sure you want to decline this offer? This action cannot be undone."
        }
        confirmText="Yes, confirm"
        cancelText="Go back"
        confirmColor={confirmModal.type === "accept" ? "bg-green-600" : "bg-red-600"}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      />
    </>
  );
};

export default ViewTrade;