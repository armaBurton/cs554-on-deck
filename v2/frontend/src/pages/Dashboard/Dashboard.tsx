// src/pages/Dashboard/Dashboard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import { NavStatus } from "../../components/NavStatus/NavStatus";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/welcome" />;

  return (
    <div className="dashboard">
      <NavStatus />
    </div>
  );
};
