// src/auth/signUp.ts

import { supabase } from "../client/supabaseClient";

export const handleSignUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
