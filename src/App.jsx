import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

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
          path="/admin/viewUsers"
          element={
            <ProtectedRoute requiredRole="Admin">
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
