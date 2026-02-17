// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContexts";
import { loadProfile, updateProfile } from "../../components/Profile/profile";
import "./Profile.css";
import "../../index.css";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadProfile(user);
    }
  }, []);

  useEffect(() => {
    const setNames = () => {
      setFirstName(profile?.first_name || "");
      setLastName(profile?.last_name || "");
      setStageName(profile?.stage_name || "");
    };

    setNames();
  }, [profile]);

  const handleUpdate = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setUpdating(true);
    setProfile(await updateProfile(user, firstName, lastName, stageName));

    setUpdating(false);
  };

  return (
    <section className="profile-section main">
      <div className="profile-div">
        {!updating ? (
          <>
            <h1>Profile</h1>
            <p className="name-text first-name">
              {firstName ? firstName : "First Name"}
            </p>
            <p className="name-text second-name">
              {lastName ? lastName : "Last Name"}
            </p>
            <p className="name-text third-name">
              {stageName ? stageName : "Stage Name"}
            </p>
            <div className="button-div">
              <button onClick={() => setUpdating(true)}>Update</button>
              <button>Go Back</button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleUpdate}>
              <h1>Profile</h1>
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                value={stageName}
                placeholder="Stage Name"
                onChange={(e) => setStageName(e.target.value)}
              />
            </form>
            <div className="button-div">
              <button>Save</button>
              <button onClick={() => setUpdating(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
