import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { loading, isAuthenticated, user } = useContext(DataContext);

  // Show loading while checking authentication
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a role is required, check user's role
  if (requiredRole) {
    const roles = user?.roles || [];
    if (!roles.includes(requiredRole)) {
      return <Navigate to="/" replace />; // or to a 403 page
    }
  }

  // Everything is fine, render child component
  return children;
};

export default ProtectedRoute;
