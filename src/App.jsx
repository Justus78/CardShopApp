import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import ViewProducts from "./Pages/Admin/Products/ViewProducts";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* User-only route */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="user">
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Admin-only routes */}
      <Route
        path="/admin/adminHome"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/viewProducts"
        element={
          <ProtectedRoute requiredRole="admin">
            <ViewProducts />
          </ProtectedRoute>
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
