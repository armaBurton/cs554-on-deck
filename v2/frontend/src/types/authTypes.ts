// src/types/authTypes.ts
import { createContext } from "react";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "./types";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    stageName?: string,
  ) => Promise<void>;
  validate: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  toggleLoading: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
