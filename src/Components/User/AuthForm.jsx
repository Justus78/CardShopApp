import { useState, useContext, useEffect } from "react";
import { getFromApi, loginUser, registerUser } from "../../Services/LoginService";
import { DataContext } from "../../Context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { motion } from "framer-motion";
import LoadingOverlay from "../LoadingSpinners/LoadingOverlay"

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(DataContext);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = { Username: userName, Password: password };
      const { error: loginError } = await loginUser(loginData);

      if (loginError) return setError("Incorrect Username or Password");

      const { data: userData } = await getFromApi("status");
      if (!userData) return setError("Failed to retrieve user info");

      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login Successful");

      const userRole = userData.roles?.[0];
      navigate(userRole === "Admin" ? "/admin/adminHome" : "/");
    } catch {
      setError("Unexpected error during login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return setLoading(false);
    }

    try {
      const registerData = {
        Username: userName,
        EmailAddress: email,
        Password: password,
      };

      const { error } = await registerUser(registerData);
      if (error) return setError(error);

      toast.success("Account created! Please verify via email.");
      setIsRegister(false);
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };
 
  if(loading) return (
    <LoadingOverlay />
  )
  return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-cyan-600/40 shadow-[0_0_25px_rgba(0,255,255,0.3)] bg-[#0f022c]/70 backdrop-blur-xl text-white"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_#0ff]">
          {isRegister ? "⚡ Create Account" : "🔐 Login"}
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form
          onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-cyan-300">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-[#0b0130]/60 border border-cyan-600/40 text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm mb-1 text-cyan-300">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-[#0b0130]/60 border border-cyan-600/40 text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <label className="block text-sm mb-1 text-cyan-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pr-10 rounded-lg bg-[#0b0130]/60 border border-cyan-600/40 text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-cyan-400 hover:text-fuchsia-400 transition"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          {isRegister && (
            <div className="relative">
              <label className="block text-sm mb-1 text-cyan-300">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 pr-10 rounded-lg bg-[#0b0130]/60 border border-cyan-600/40 text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-cyan-400 hover:text-fuchsia-400 transition"
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
              {confirmPassword && (
                <p
                  className={`mt-1 text-sm ${
                    passwordsMatch ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {passwordsMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
                </p>
              )}
            </div>
          )}

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-purple-600 hover:shadow-[0_0_20px_#0ff] transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </motion.button>
        </form>

        {/* Toggle */}
        <p className="mt-4 text-sm text-center text-cyan-300">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-fuchsia-400 hover:text-cyan-400 transition"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </motion.div>
    
  );
};

export default AuthForm;
