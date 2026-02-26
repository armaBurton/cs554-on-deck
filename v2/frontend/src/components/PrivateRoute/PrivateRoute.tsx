// src/components/PrivateRoutes/PrivateRoutes.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import { NavStatus } from "../NavStatus/NavStatus";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <>
      <NavStatus />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : user ? (
        <>{children}</>
      ) : (
        <Navigate to="/validate" />
      )}
    </>
  );
};
