// src/components/Profile/Static.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../contexts/ProfileContexts";

export const Static: React.FC = () => {
  const {
    updating,
    setUpdating,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    stageName,
    setStageName,
  } = useProfile();
  const navigate = useNavigate();

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
