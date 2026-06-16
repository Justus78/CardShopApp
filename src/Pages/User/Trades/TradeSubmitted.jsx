import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../../../Components/User/Navbar'
import Footer from '../../../Components/User/Footer'
import LoadingOverlay from '../../../Components/LoadingSpinners/LoadingOverlay'
import ConfirmModal from "../../../Components/ConfirmModal";
import { getTradeByTradeCode, updateTradeStatusUser } from "../../../Services/TradeInService";
import { toast } from "react-toastify";
import { TradeInStatus } from "../../../Context/Constants/TradeInStatus";

const TradeSubmitted = () => {

  const { tradeCode } = useParams();
  const [loading, setLoading] = useState(false);
  const [tradeIn, setTradeIn] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const handlePrint = () => window.print();

  const GetTrade = async (tradeCode) => {
    try {
      setLoading(true);
      const trade = await getTradeByTradeCode(tradeCode);
      if (trade) setTradeIn(trade);
      console.log(trade);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetTrade(tradeCode);
  }, [tradeCode]);

  const handleChangeStatus = async () => {
    try {
      setLoading(true);
      await updateTradeStatusUser(tradeIn.id);
      setConfirmModal(false);
      toast.success("Your trade has been marked as shipped!");
      // Reload the trade to reflect the new status
      await GetTrade(tradeCode);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = {
    Submitted: 20,
    Shipped: 40,
    Received: 60,
    Evaluating: 80,
    Offer: 100,
  };

  const currentStatus = "Submitted";
  const progressWidth = statusSteps[currentStatus];

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-300 border-white rounded-2xl mt-40">

        <h1 className="text-3xl font-bold text-center mb-2">
          Trade Submitted Successfully
        </h1>

        <div className="text-center text-lg mb-6">
          <span className="text-gray-600">Trade ID: </span>
          <span className="font-semibold text-white">{tradeCode || "N/A"}</span>
        </div>

        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progressWidth}%` }}
        />

        <div className="flex justify-between text-xs text-gray-500 mb-8">
          <span>Submitted</span>
          <span>Shipped</span>
          <span>Received</span>
          <span>Evaluating</span>
          <span>Offer</span>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
          <p className="text-gray-700">
            Please ship your cards to the address below. Your trade will not be
            processed until we receive your shipment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p>Your Card Shop Name</p>
            <p>123 Main Street</p>
            <p>Alcoa, TN 37701</p>
            <p>United States</p>
          </div>
        </section>

        <section className="mb-8 bg-blue-50 p-4 rounded-md border border-blue-200">
          <h2 className="text-xl font-semibold mb-2">
            Include Your Trade ID in the Package
          </h2>
          <p className="text-gray-700 mb-3">
            To ensure your shipment is processed correctly, include your Trade ID
            inside your package.
          </p>
          <div className="border-2 border-dashed text-green-400 border-gray-400 text-center py-3 mb-4 text-xl font-bold bg-white">
            {tradeCode || "Missing Trade Code"}
          </div>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Write your Trade ID on a note inside the package</li>
            <li>You can print this page and include it</li>
            <li>Optional: write the Trade ID on the outside of the box</li>
          </ul>
          <p className="text-red-600 font-semibold mt-3">
            Packages without a Trade ID may be delayed or not processed.
          </p>
          <button
            onClick={handlePrint}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Print This Page
          </button>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Packaging Instructions</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Place cards in sleeves to prevent scratches</li>
            <li>Use toploaders or rigid holders for valuable cards</li>
            <li>Secure cards so they do not move during shipping</li>
            <li>Use a padded envelope or box</li>
            <li>Do NOT ship loose cards</li>
          </ul>
        </section>

        <section className="mb-8 bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <h2 className="text-xl font-semibold mb-2">Important Rules & Warnings</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Cards must match the submitted condition</li>
            <li>Damaged or incorrect cards may reduce your offer</li>
            <li>Counterfeit cards will not be accepted</li>
            <li>We are not responsible for lost or damaged shipments</li>
            <li>Tracking is highly recommended</li>
            <li>Trades not received within 14 days may be canceled</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">After You Ship</h2>
          <p className="text-gray-700 mb-3">
            Once your package has been shipped, click below to notify us. You may
            also provide a tracking number.
          </p>
          <button
            className={`px-5 py-2 text-white rounded-md transition
              ${tradeIn?.status === 3  // TradeInStatus.Shipped
              ? "bg-gray-500 cursor-not-allowed opacity-50" 
              : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
            onClick={() => setConfirmModal(true)}
            disabled={tradeIn?.status === 3}
          >
            I've Shipped My Cards
          </button>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">What Happens Next?</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>We receive and log your shipment</li>
            <li>We evaluate your cards</li>
            <li>You receive an offer</li>
            <li>You accept or decline the offer</li>
            <li>If you accept, we add the trade credit to your account</li>
            <li>If you decline, we ship the cards back to you</li>
          </ul>
        </section>
      </div>

      <ConfirmModal
        isOpen={confirmModal}
        title="Confirm Shipment"
        message="Please confirm you have shipped your cards. This action cannot be undone."
        confirmText="Yes, I've shipped"
        cancelText="Go back"
        confirmColor="bg-green-600"
        cancelColor="bg-gray-600"
        onConfirm={handleChangeStatus}
        onCancel={() => setConfirmModal(false)}
      />

      <Footer />
    </>
  );
};

export default TradeSubmitted;