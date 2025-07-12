import { useState, useContext } from "react";
import { postToApi } from "../../Services/LoginService";
import { DataContext } from "../../Context/DataContext";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(DataContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = {
        Username: userName,
        Password: password,
      };

      const { error } = await postToApi("login", loginData);

      if (error) {
        setError("Incorrect Username or Password");
        toast.error("Incorrect Username or Password");
        return;
      } else {
        toast.success("Login Successful");
      }

      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
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
      } else {
        toast.success("User registered successfully.");
      }
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
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
