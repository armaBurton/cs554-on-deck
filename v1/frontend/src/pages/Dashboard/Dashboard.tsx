// src/pages/Dashboard/Dashboard.tsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={() => navigate("/profile")}>View Profile</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
