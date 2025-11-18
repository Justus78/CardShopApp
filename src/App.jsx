import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import 'react-toastify/dist/ReactToastify.css';


import Login from "./Pages/User/Login/Login";
import Home from "./Pages/User/Home/Home";
import ViewProducts from "./Pages/User/Products/ViewProducts";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import ViewProductsAdmin from "./Pages/Admin/Products/ViewProducts";
import AddProduct from "./Pages/Admin/Products/AddProduct";
import Orders from "./Pages/Admin/Orders/Orders";
import Users from "./Pages/Admin/Users/Users";
import Footer from "./Components/User/Footer";

import { useContext, useEffect } from "react";
import { DataContext } from "./Context/DataContext";
import CartPage from "./Pages/User/Cart/CartPage";
import OrderSuccess from "./Components/User/OrderSuccess";
import ViewOrders from "./Pages/User/Orders/ViewOrders";
import CheckoutPage from "./Pages/User/Checkout/CheckoutPage";
import ForgotPassword from './Pages/User/ForgotPassword/ForgotPassword'
import VerifyEmail from './Pages/User/VerifyEmail/VerifyEmail'
import ResetPassword from './Pages/User/ResetPassword/ResetPassword'
import OrderDetails from "./Pages/Admin/Orders/OrderDetails";
import UserDetails from "./Pages/Admin/Users/UserDetails";
import TradeIn from "./Pages/User/Trades/TradeIn";

function App() {
  const { isAuthenticated, user, loading } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // If logged in as Admin, redirect root ("/") → Admin Dashboard
      if (location.pathname === "/" && user?.roles?.includes("Admin")) {
        navigate("/admin/adminHome", { replace: true });
      }
    }
  }, [loading, isAuthenticated, user, location.pathname, navigate]);

  return (
    <>
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#0a0024] via-[#10002b] to-[#001f2d]">
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,0,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/viewProducts" element={<ViewProducts />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        {/** User Routes */}
        <Route
          path="/userCart"
          element={
          <ProtectedRoute requiredRole="User">
            <CartPage />
          </ProtectedRoute>
        }
        />

        <Route
          path="/userTrade"
          element={
          <ProtectedRoute requiredRole="User">
            <TradeIn />
          </ProtectedRoute>
        }
        />

        <Route
          path="/userCheckout"
          element={
          <ProtectedRoute requiredRole="User">
            <CheckoutPage />
          </ProtectedRoute>
        }
        />

        <Route
          path="/order-success/:id"
          element={
            <ProtectedRoute requiredRole="User">
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/viewOrders"
          element={
            <ProtectedRoute requiredRole="User">
              <ViewOrders />
            </ProtectedRoute>
          }
        />



       

        {/* Admin-only routes */}
        <Route
          path="/admin/adminHome"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/viewProducts"
          element={
            <ProtectedRoute requiredRole="Admin">
              <ViewProductsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addProduct"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/viewOrders"
          element={
            <ProtectedRoute requiredRole="Admin">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute requiredRole="Admin">
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/viewUsers"
          element={
            <ProtectedRoute requiredRole="Admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userDetails/:id"
          element={
            <ProtectedRoute requiredRole="Admin">
              <UserDetails />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
