import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken"); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/adminLogin" />;
};

export default ProtectedRoute;
