import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import ViewProducts from "./Pages/Admin/Products/ViewProducts";
import AddProduct from "./Pages/Admin/Products/AddProduct"
import Orders from "./Pages/Admin/Orders/Orders"
import Users from "./Pages/Admin/Users/Users";

function App() {
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
            <ViewProducts />
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
