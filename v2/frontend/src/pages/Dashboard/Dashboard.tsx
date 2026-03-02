// src/pages/Dashboard/Dashboard.tsx
// import React, { useEffect } from "react";
// import { useProfile } from "../../contexts/ProfileContext";
// import { useAuth } from "../../contexts/AuthContext";
import { RightDash } from "../../components/Dashboard/RightDash/RightDash";
import { LeftDash } from "../../components/Dashboard/LeftDash/LeftDash";

import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  // const { user } = useAuth();
  // const { profile, setProfile } = useProfile();

  return (
    <>
      <section className="main-dashboard main">
        <div className="left-dashboard">
          <LeftDash />
        </div>
        <div className="right-dashboard">
          <RightDash />
        </div>
      </section>
      ;
    </>
  );
};
