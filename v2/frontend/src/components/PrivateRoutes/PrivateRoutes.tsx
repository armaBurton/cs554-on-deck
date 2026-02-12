// src/components/PrivateRoutes/PrivateRoutes.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

export const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : user ? (
        <>{children}</>
      ) : (
        <Navigate to="/on-deck" />
      )}
    </>
  );
};
