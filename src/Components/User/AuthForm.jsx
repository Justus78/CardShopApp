import { useState, useContext } from "react";
import { postToApi, getFromApi } from "../../Services/LoginService";
import { DataContext } from "../../Context/DataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setIsAuthenticated, setUser, } = useContext(DataContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = {
        Username: userName,
        Password: password,
      };

      const { error: loginError } = await postToApi("login", loginData);

      if (loginError) {
        setError("Incorrect Username or Password");
        toast.error("Incorrect Username or Password");
        return;
      }

      // Get user info after login
      const { data: userData, error: statusError } = await getFromApi("status");

      if (statusError || !userData) {
        setError("Failed to retrieve user info");
        console.log(statusError)
        toast.error("Login failed");
        return;
      }

      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login Successful");

      const userRole = userData.roles?.[0];
      console.log(userRole)

      // Navigate based on role
      if (userRole === "Admin") {
        navigate("/admin/adminHome");
      } else {
        navigate("/");
      }

    } catch (err) {
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

    try {
      const registerData = {
        Username: userName,
        EmailAddress: email,
        Password: password,
      };

      const { error } = await postToApi("register", registerData);

      if (error) {
        setError(error);
        toast.error(error);
        return;
      }

      toast.success("User registered successfully.");
      // Optionally switch to login form or log in automatically
      setIsRegister(false);
    } catch (err) {
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
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create an Account" : "Login to Your Account"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form
          onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="userName"
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
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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

        <p className="mt-4 text-sm text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
