// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContexts";
import { useProfile } from "../../contexts/ProfileContexts";
import { loadProfile } from "../../components/Profile/profile";
import { Dynamic } from "../../components/Profile/Dynamic/Dynamic";
import { Static } from "../../components/Profile/Static/Static";
import "../../index.css";
import "./Profile.css";

export const Profile: React.FC = () => {
  const { user, loading, setLoading } = useAuth();
  const {
    profile,
    setProfile,
    updating,
    setUpdating,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    stageName,
    setStageName,
    updateProfile,
  } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Loading profile for user:", user);
      loadProfile(user);
    }
    setUpdating(false);
  }, []);

  useEffect(() => {
    const setNames = () => {
      setFirstName(profile?.first_name || "");
      setLastName(profile?.last_name || "");
      setStageName(profile?.stage_name || "");
    };

    setNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <section className="profile-section main">
      <div className="profile-div">
        {loading ? "Loading..." : !updating ? <Static /> : <Dynamic />}
      </div>
    </section>
  );
};
