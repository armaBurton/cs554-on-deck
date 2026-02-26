// src/types/authTypes.ts
import { createContext } from "react";
import type { User, Session } from "@supabase/supabase-js";
import type { ProfileType } from "./types";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  profile: ProfileType | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  stageName: string;
  setStageName: React.Dispatch<React.SetStateAction<string>>;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    stageName?: string,
  ) => Promise<void>;
  validate: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  handleProfileUpdate: (
    firstName: string,
    lastName: string,
    stageName: string,
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
