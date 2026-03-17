// src/pages/Dashboard/Dashboard.tsx
import React, { useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { RightDash } from "../../components/Dashboard/RightDash/RightDash";
import { LeftDash } from "../../components/Dashboard/LeftDash/LeftDash";

import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const { getAllUsers } = useProfile();

  useEffect(() => {
    getAllUsers();
  }, []);

  // console.log("USERS: ", users);

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
    </>
  );
};
