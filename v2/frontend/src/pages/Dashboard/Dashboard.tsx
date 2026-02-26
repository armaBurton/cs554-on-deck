// src/pages/Dashboard/Dashboard.tsx
import React, { useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContexts";
import { NavStatus } from "../../components/NavStatus/NavStatus";

import "../../index.css";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const { profile, setProfile } = useProfile();

  console.log("/dashboard --> profile: ", profile);
  return (
    <>
      <section className="main-dashboard main">
        <div className="left-dashboard">LEFT</div>
        <div className="right-dashboard">RIGHT</div>
      </section>
      ;
    </>
  );
};
