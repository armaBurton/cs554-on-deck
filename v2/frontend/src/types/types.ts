// src/types/types.ts
export interface Profile {
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
