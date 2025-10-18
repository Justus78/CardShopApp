import { useState, useContext, useEffect } from "react";
import { postToApi, getFromApi, loginUser, registerUser } from "../../Services/LoginService";
import { DataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // 👁️ simple icon set (install via `npm i lucide-react`)

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // toggle for confirm password
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(DataContext);

  const passwordsMatch = password === confirmPassword && password.length > 0; // var to check password match

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = { Username: userName, Password: password };
      const { error: loginError } = await loginUser(loginData);

      if (loginError) {
        setError("Incorrect Username or Password");
        toast.error("Incorrect Username or Password");
        return;
      }

      const { data: userData, error: statusError } = await getFromApi("status");
      if (statusError || !userData) {
        setError("Failed to retrieve user info");
        toast.error("Login failed");
        return;
      }

      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login Successful");

      const userRole = userData.roles?.[0];
      if (userRole === "Admin") navigate("/admin/adminHome");
      else navigate("/");
    } catch {
      setError("Unexpected error during login");
      toast.error("Unexpected error");
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
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const registerData = {
        Username: userName,
        EmailAddress: email,
        Password: password,
      };

      const { error } = await registerUser(registerData);
      if (error) {
        setError(error);
        toast.error(error);
        return;
      }

      toast.success("User registered successfully. Please check your email to verify your account.");
      setIsRegister(false);
    } catch {
      setError("Registration failed");
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create an Account" : "Login to Your Account"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form
          onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {/* Password with visibility toggle 👇 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full mt-1 p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
                isRegister
                  ? passwordsMatch
                    ? "border-green-400 focus:ring-green-400"
                    : "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

        {/* Password Requirements (only shown on Register) */}
        {isRegister && (
          <div className="mt-3 text-sm text-left">
            <p className="font-semibold text-gray-700 mb-1">Password must contain:</p>
            <ul className="space-y-1">
              <li
                className={`flex items-center ${
                  /[A-Z]/.test(password) ? "text-green-600" : "text-red-600"
                }`}
              >
                {/[A-Z]/.test(password) ? "✅" : "❌"} One uppercase letter
              </li>
              <li
                className={`flex items-center ${
                  /[a-z]/.test(password) ? "text-green-600" : "text-red-600"
                }`}
              >
                {/[a-z]/.test(password) ? "✅" : "❌"} One lowercase letter
              </li>
              <li
                className={`flex items-center ${
                  /[0-9]/.test(password) ? "text-green-600" : "text-red-600"
                }`}
              >
                {/[0-9]/.test(password) ? "✅" : "❌"} One number
              </li>
              <li
                className={`flex items-center ${
                  /[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-red-600"
                }`}
              >
                {/[^A-Za-z0-9]/.test(password) ? "✅" : "❌"} One special character
              </li>
              <li
                className={`flex items-center ${
                  password.length >= 10 ? "text-green-600" : "text-red-600"
                }`}
              >
                {password.length >= 10 ? "✅" : "❌"} Minimum 10 characters
              </li>
            </ul>
          </div>
          )}

          {/* Confirm Password with toggle */}
          {isRegister && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full mt-1 p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
                  confirmPassword.length > 0
                    ? passwordsMatch
                      ? "border-green-400 focus:ring-green-400"
                      : "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>

              {confirmPassword.length > 0 && (
                <p
                  className={`mt-1 text-sm font-medium ${
                    passwordsMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {passwordsMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (isRegister && !passwordsMatch)}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              loading || (isRegister && !passwordsMatch)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {/* Forgot Password link (only show on login) */}
        {!isRegister && (
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-2 text-blue-600 hover:underline font-medium"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
