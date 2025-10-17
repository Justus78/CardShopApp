// src/pages/Auth/VerifyEmail.jsx
import React, { useEffect, useState, useRef } from "react";
import { verifyEmail } from "../../../Services/LoginService";
import { useSearchParams, Link } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const hasSent = { current : false };
    
    const verify = async () => {
      console.log(hasSent);
      if (hasSent.current) return; // check to see if sent already, dev only react.strictmode
      hasSent.current = true; // set has sent to true

      const result = await verifyEmail(userId, token);
      if (result.error) {
        setStatus("Email verification failed. The link may be invalid or expired.");
      } else {
        setStatus("Your email has been successfully verified!");
      }
    };
    verify();
  }, [userId, token]);

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h2>
        <p
          className={`${
            status.includes("failed") ? "text-red-600" : "text-green-600"
          } font-medium`}
        >
          {status}
        </p>

        <div className="mt-6">
          <Link
            to="/login"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
