// src/pages/Profile/Profile.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Profile as ProfileType, Social } from "../../types";

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
};
