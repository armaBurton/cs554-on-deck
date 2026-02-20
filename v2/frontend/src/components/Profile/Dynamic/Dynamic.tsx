// src/components/Profile/Dynamic/Dynamic.tsx
import React from "react";
import type { ProfileProps } from "../../../interface/types";
import { useAuth } from "../../../contexts/AuthContexts";

export const Dynamic: React.FC = ({
  firstName,
  lastName,
  stageName,
}: ProfileProps) => {
  const { handleProfileUpdate, setFirstName, setLastName, setStageName } =
    useAuth();

  const handleUpdate = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await handleProfileUpdate(firstName, lastName, stageName);
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
    </form>
  );
};
