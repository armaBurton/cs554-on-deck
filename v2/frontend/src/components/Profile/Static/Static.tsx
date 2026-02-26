// src/components/Profile/Static.tsx
import React from "react";
import { useProfile } from "../../../contexts/ProfileContexts";
import type { ProfileProps } from "../../../interface/types";

export const Static: React.FC = ({
  firstName,
  lastName,
  stageName,
}: ProfileProps) => {
  return (
    <div className="fake-form update-form">
      <h1>Profile</h1>
      <div className="name-div">
        <p className="profile-name-text first-name profile-text names">
          {firstName ? firstName : "First Name"}
        </p>
        <p className="profile-name-text last-name profile-text names">
          {lastName ? lastName : "Last Name"}
        </p>
      </div>
      <p className="profile-name-text stage-name profile-text">
        {stageName ? stageName : "Stage Name"}
      </p>
      <div className="button-div">
        <button onClick={() => setUpdating(true)}>Update</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
    </div>
  );
};
