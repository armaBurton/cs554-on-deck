// src/types/types.ts
import type { User, Session } from "@supabase/supabase-js";

export interface ProfileType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  stage_name: string;
  created_at: string;
  updated_at: string;
}

export interface HamburgerProps {
  onClick: () => void;
  isInitiallyOpen?: boolean;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    stageName?: string,
  ) => Promise<void>;
  validate: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
