import { data } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import { supabase } from "../../lib/supabase";

export const loadProfile = async (user) => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user!.id)
      .single();

    if (profileError) throw profileError;

    // setProfile(profileData);
    // setFirstName(profileData.first_name || "");
    // setLastName(profileData.last_name || "");
    // setStageName(profileData.stage_name || "");
    return { profileData };
  } catch (err) {
    console.error("Error loading profile:", err);
  }
};

export const updateProfile = async (user, firstName, lastName, stageName) => {
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

    loadProfile(user);
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};
