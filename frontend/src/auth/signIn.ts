// src/auth/signIn.ts
import { supabase } from "../client/supabaseClient";

export const handleSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
