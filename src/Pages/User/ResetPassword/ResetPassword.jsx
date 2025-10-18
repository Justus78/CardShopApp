// src/pages/Auth/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { resetPassword } from "../../../Services/LoginService";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Password validation logic
  const requirements = [
    { label: "At least 10 characters", test: (pw) => pw.length >= 10 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /[0-9]/.test(pw) },
    { label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
  ];

  const passwordValid = requirements.every((r) => r.test(password));
  const passwordsMatch = password === confirm && confirm.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!passwordValid) {
      setError("Password does not meet all requirements.");
      toast.error("Password does not meet all requirements.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    const result = await resetPassword({
      email,
      token,
      newPassword: password,
      confirmPassword: confirm,
    });

    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      setMessage("Your password has been reset successfully!");
      toast.success("Your password has been reset successfully!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {/* Password Requirements */}
            <div className="mt-3 text-sm">
              {requirements.map((req, idx) => (
                <p
                  key={idx}
                  className={`flex items-center gap-2 ${
                    req.test(password) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {req.test(password) ? "✅" : "❌"} {req.label}
                </p>
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                confirm.length > 0
                  ? passwordsMatch
                    ? "border-green-400 focus:ring-green-400"
                    : "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
            {confirm.length > 0 && (
              <p
                className={`mt-1 text-sm font-medium ${
                  passwordsMatch ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordsMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!passwordValid || !passwordsMatch}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              !passwordValid || !passwordsMatch
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Reset Password
          </button>
        </form>

        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <div className="text-center mt-6">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
