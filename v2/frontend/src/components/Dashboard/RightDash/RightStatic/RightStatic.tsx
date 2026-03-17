// src/components/Dashboard/RightDash/RightStatic/RightStatic.tsx
import React from "react";
import { useProfile } from "../../../../contexts/ProfileContext";
import { getName } from "../../../../services/services";
import "../RightPanels.css";
import { RightController } from "../RightController/RightController";

export const RightStatic: React.FC = () => {
  const { profile } = useProfile();

  return (
    <section className="right-static">
      <div className="right-dash-header dash-header">
        <p className="right-section-text dash-text">
          hello{" "}
          <span className="right-section-emphasis dash-emphasis text-bigger">
            {profile && getName(profile)}
          </span>
        </p>
      </div>
    </section>
  );
};
