import { useAuth } from "../../contexts/AuthContexts";

export const loadProfile = async (user: any) => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user!.id)
      .single();

    return profileData;
    if (profileError) throw profileError;
  } catch (err) {
    console.error("Error loading profile:", err);
  }
};
