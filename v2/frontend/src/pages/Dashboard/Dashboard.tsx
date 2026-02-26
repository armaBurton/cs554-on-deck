// src/pages/Dashboard/Dashboard.tsx
import React, { useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContexts";
import { NavStatus } from "../../components/NavStatus/NavStatus";

import "./Dashboard.css";
import "../../index.css";

export const Dashboard: React.FC = () => {
  const { profile, setProfile } = useProfile();

  console.log("dashboard");
  return (
    <>
      <section className="dashboard-section main">Dashboard</section>;
    </>
  );
};
