// src/components/Profile/Dynamic/Dynamic.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../contexts/ProfileContexts";

export const Dynamic: React.FC = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    stageName,
    setStageName,
    setUpdating,
    updateProfile,
  } = useProfile();
  const navigate = useNavigate();

  const handleUpdate = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await updateProfile(firstName, lastName, stageName);
    navigate("/dashboard");
  };
  return (
    <form
      className="profile-form update-form"
      onSubmit={handleUpdate}
    >
      <h1>Profile</h1>
      <div className="name-div">
        <input
          type="text"
          value={firstName}
          placeholder={firstName ? firstName : "First Name"}
          className="profile-name-input first-name profile-text names"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder={lastName ? lastName : "Last Name"}
          className="profile-name-input last-name profile-text names"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <input
        type="text"
        value={stageName}
        placeholder={stageName ? stageName : "Stage Name"}
        className="profile-name-input stage-name profile-text"
        onChange={(e) => setStageName(e.target.value)}
      />
      <div className="button-div">
        <button
          type="submit"
          onClick={() => setUpdating(true)}
        >
          Save
        </button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
    </form>
  );
};
