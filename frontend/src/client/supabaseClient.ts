// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_HOST as string;
// const supabaseAnonKey = process.env.SUPABASE_PASSWORD as string;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are not set properly.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
