// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContexts";
import { loadProfile, updateProfile } from "../../components/Profile/profile";
import type { ProfileType } from "../../interface/types";
import "./Profile.css";
import "../../index.css";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Loading profile for user:", user);
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
    setLoading(true);
    console.log("Updating profile with:", { firstName, lastName, stageName });
    const profile = await updateProfile(firstName, lastName, stageName);

    console.log("Profile updated:", profile);
    setUpdating(false);
    setLoading(false);
  };

  return (
    <section className="profile-section main">
      <div className="profile-div">
        {loading ? (
          "Loading..."
        ) : !updating ? (
          <>
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
            </div>
            <div className="button-div">
              <button onClick={() => setUpdating(true)}>Update</button>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            </div>
          </>
        ) : (
          <>
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
            <div className="button-div">
              <button type="submit">Save</button>
              <button onClick={() => setUpdating(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
