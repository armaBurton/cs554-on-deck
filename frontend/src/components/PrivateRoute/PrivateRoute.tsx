// src/components/PrivateRoute/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : user ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
