// src/auth/Oauth.ts
import type { Provider } from "react";
import { supabase } from "../client/supabaseClient";

export const handleOAuthSignIn = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
