// src/components/Dashboard/RightDash/RightStatic/RightStatic.tsx
import React from "react";
import { useProfile } from "../../../../contexts/ProfileContexts";
import { getName } from "../../../../services/services";

export const RightStatic: React.FC = () => {
  const { profile } = useProfile();

  return (
    <p className="right-section-text dash-text">
      hello{" "}
      <span className="right-section-emphasis dash-emphasis text-bigger">
        {profile && getName(profile)}
      </span>
    </p>
  );
};
