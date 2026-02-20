import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

export const loadProfile = async (user: User) => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user!.id)
      .single();

    if (profileError) throw profileError;

    return { profileData };
  } catch (err) {
    console.error("Error loading profile:", err);
  }
};

export const updateProfile = async (
  firstName: string,
  lastName: string,
  stageName: string,
) => {
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
