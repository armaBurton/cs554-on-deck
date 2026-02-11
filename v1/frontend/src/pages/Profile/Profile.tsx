// src/pages/Profile/Profile.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import type { Profile as ProfileType, Social } from "../../types/types";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");

  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (profileError) throw profileError;

      const { data: socialsData, error: socialsError } = await supabase
        .from("socials")
        .select("*")
        .eq("profile_id", user!.id);

      if (socialsError) throw socialsError;

      setProfile(profileData);
      setSocials(socialsData || []);
      setFirstName(profileData.first_name);
      setLastName(profileData.last_name);
      setStageName(profileData.stageName);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          stage_name: stageName,
        })
        .eq("id", user!.id);

      if (error) throw error;

      alert("Profile Updated Successfully");
      loadProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const addSocial = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("socials").insert({
        platform_id: user!.id,
        platform: newSocialPlatform,
        url: newSocialUrl,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error adding social:", error);
      alert("Failed to add social");
    }
  };

  const deleteSocial = async (id: string) => {
    try {
      const { error } = await supabase.from("socials").delete().eq("id", id);

      if (error) throw error;
      loadProfile();
    } catch (error) {
      console.error("Error deleting social:", error);
      alert("Failed to delete social");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-section">
        <h2>Personal Information</h2>
        <p>
          <span className="strong">Email:</span>
          {profile?.email}
        </p>
        <form onSubmit={updateProfile}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Stage Name</label>
            <input
              type="text"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
            />
          </div>

          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      <div className="profile-section">
        <h2>Social Links</h2>
        <div className="socials-list">
          {socials.map((social) => (
            <div key={social.id} className="social-item">
              <p>
                <span className="strong">{social.platform}</span> {social.url}
              </p>
              <button onClick={() => deleteSocial(social.id)}>Delete</button>
            </div>
          ))}
        </div>

        <form onSubmit={addSocial} className="add-social-form">
          <h3>Add Social Link</h3>
          <div className="form-group">
            <label>Platform</label>
            <input
              type="text"
              value={newSocialPlatform}
              onChange={(e) => setNewSocialPlatform(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              value={newSocialUrl}
              onChange={(e) => setNewSocialUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Social</button>
        </form>
        {/*  */}
      </div>
    </div>
  );
};
