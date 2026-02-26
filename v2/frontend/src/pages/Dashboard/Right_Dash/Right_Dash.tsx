// src/pages/Dashboard/Right_Dash/Right_Dash.tsx
import React from "react";
import { useProfile } from "../../../contexts/ProfileContexts";
import { getName } from "../../../services/services";

import "../../../index.css";
import "../Dashboard.css";
import "./Right_Dash.css";

export const Right_Dash: React.FC = () => {
  const { profile } = useProfile();

  return (
    <section className="right-section">
      <p className="right-section-text dash-text">
        hello{" "}
        <span className="right-section-emphasis dash-emphasis text-bigger">
          {profile && getName(profile)}
        </span>
      </p>
      <div className="event-creation-panel">
        <button>Create Event</button>
        <button>Find Event</button>
        <button>View Profile</button>
      </div>
    </section>
  );
};
