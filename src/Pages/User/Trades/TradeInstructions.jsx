import React from "react";

const TradeInstructions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Trade-In Instructions
          </h1>
          <p className="text-gray-600 text-lg">
            Please follow the steps below to complete your trade-in safely and quickly.
          </p>
        </div>

        {/* Section */}
        <div className="space-y-10">

          {/* Step 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Check Your Confirmation Email
            </h2>
            <p className="text-gray-600 leading-relaxed">
              After submitting your trade-in request, you will receive a confirmation
              email containing your <span className="font-medium">Trade-In ID</span>.
              Please include this ID inside your package.
            </p>
          </section>

          {/* Step 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Package Your Cards Securely
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Place cards in sleeves or team bags.</li>
              <li>Use toploaders or cardboard protection for valuable cards.</li>
              <li>Ensure cards cannot shift during shipping.</li>
              <li>Do NOT place tape directly on cards.</li>
            </ul>
          </section>

          {/* Step 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Include Required Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Your Trade-In ID</li>
              <li>Your full name</li>
              <li>The email used during submission</li>
            </ul>
          </section>

          {/* Step 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Shipping Address
            </h2>

            <div className="bg-gray-100 rounded-xl p-6 border border-gray-200 mb-4">
              <p className="font-semibold text-gray-800">Your Store Name</p>
              <p className="text-gray-700">Trade-In Department</p>
              <p className="text-gray-700">123 Card Shop Lane</p>
              <p className="text-gray-700">Your City, State ZIP</p>
            </div>

            <p className="text-gray-600">
              We strongly recommend tracked shipping for trade-ins valued over $50.
            </p>
          </section>

          {/* Step 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Condition Guidelines
            </h2>
            <p className="text-gray-600 mb-3">
              Cards must match the selected condition at submission. If cards
              arrive in worse condition, the final offer may be adjusted.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-100 rounded-lg py-3 font-medium">NM</div>
              <div className="bg-gray-100 rounded-lg py-3 font-medium">LP</div>
              <div className="bg-gray-100 rounded-lg py-3 font-medium">MP</div>
              <div className="bg-gray-100 rounded-lg py-3 font-medium">HP</div>
            </div>
          </section>

          {/* Step 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Processing Timeline
            </h2>
            <p className="text-gray-600">
              Once your package arrives, please allow{" "}
              <span className="font-medium">2–5 business days</span> for inspection
              and final offer confirmation.
            </p>
          </section>

          {/* Step 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              7. Payment
            </h2>
            <p className="text-gray-600">
              After verification, payment will be issued using the method you
              selected during submission (Store Credit, PayPal, etc.).
            </p>
          </section>

          {/* Important Notice */}
          <section className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-3">
              Important Notice
            </h2>
            <p className="text-red-700">
              We are not responsible for lost or damaged packages during transit.
              Please package securely and consider insurance for high-value shipments.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TradeInstructions;