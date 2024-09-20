
import { useAuth } from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const location = useLocation();

  if (localStorage.getItem("role") && !auth.role) {
    return <p>Loading...</p>;
  }

  return allowedRoles?.includes(auth.role) ? (
    <Outlet />
  ) : auth?.user_id ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

