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
      <h1>Dashboard</h1>
      <p>
        Welcome,{" "}
        {user?.identities?.[0]?.identity_data?.first_name || user?.email}
      </p>
      {/* <button onClick={() => navigate("/profile")}>View Profile</button>
      <button onClick={handleSignOut}>Sign Out</button> */}
    </div>
  );
};
