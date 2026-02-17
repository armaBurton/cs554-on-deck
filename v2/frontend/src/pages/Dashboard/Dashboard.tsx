// src/pages/Dashboard/Dashboard.tsx
import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { NavStatus } from "../../components/NavStatus/NavStatus";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  {
    console.log(
      user?.identities?.[0]?.identity_data?.first_name || "No first name",
    );
  }
  return (
    <div className="dashboard">
      <NavStatus />
    </div>
  );
};
