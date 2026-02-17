import { useAuth } from "../../contexts/AuthContexts";
import { supabase } from "../../lib/supabase";

export const loadProfile = (user: any) => {
  try {
    const { data: profileData, error: profileError } = supabase
      .from("profiles")
      .select("*")
      .eq("id", user!.id)
      .single();

    if (profileError) throw profileError;
    return profileData;
  } catch (err) {
    console.error("Error loading profile:", err);
  }
};
