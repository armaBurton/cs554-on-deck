// src/pages/Dashboard/Dashboard.tsx
import React from "react";
import { RightDash } from "../../components/Dashboard/RightDash/RightDash";
import { LeftDash } from "../../components/Dashboard/LeftDash/LeftDash";

import "./Dashboard.css";

export const Dashboard: React.FC = () => {
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
