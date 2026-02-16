// src/pages/Dashboard/Dashboard.tsx
import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { NavStatus } from "../../components/NavStatus/NavStatus";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  {
    console.log(user);
  }
  return (
    <div className="dashboard">
      <NavStatus />
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      {/* <button onClick={() => navigate("/profile")}>View Profile</button>
      <button onClick={handleSignOut}>Sign Out</button> */}
    </div>
  );
};
