import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Pages/User/Login/Login";
import Home from "./Pages/User/Home/Home";
import ViewProducts from "./Pages/User/Products/ViewProducts";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import ViewProductsAdmin from "./Pages/Admin/Products/ViewProducts";
import AddProduct from "./Pages/Admin/Products/AddProduct"
import Orders from "./Pages/Admin/Orders/Orders"
import Users from "./Pages/Admin/Users/Users";
import { useContext, useEffect } from "react";
import { DataContext } from "./Context/DataContext";

function App() {

  const { isAuthenticated, user, loading } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(user?.roles[0])
    if (!loading && isAuthenticated) {
      // If we're at the root path and already authenticated, send to appropriate dashboard
      if (location.pathname === "/") {
        if (user?.roles[0] === "Admin") {
          navigate("/admin/adminHome");
        }
      }
    }
  }, [loading, isAuthenticated, user, location.pathname, navigate]);


  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* User-only route */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="User">            
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/User/viewProducts"
        element={
          <ProtectedRoute requiredRole="User">            
            <ViewProducts />
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
        path="/admin/AddProduct"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/ViewOrders"
        element={
          <ProtectedRoute requiredRole="Admin">
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/ViewUsers"
        element={
          <ProtectedRoute requiredRole="Admin">
            <Users />
          </ProtectedRoute>
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
