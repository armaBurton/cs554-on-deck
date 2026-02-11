// src/types/types.ts
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  stage_name: string | null;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Social {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
}
