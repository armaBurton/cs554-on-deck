// src/types/types.ts
// import type { User, Session } from "@supabase/supabase-js";

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
export interface ProfileContextType {
  profile: ProfileType | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
  updating: boolean;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  stageName: string;
  setStageName: React.Dispatch<React.SetStateAction<string>>;
  updateProfile: (
    firstName: string,
    lastName: string,
    stageName: string,
  ) => Promise<void>;
}

export interface EventContextType {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  event: boolean;
  setEvent: React.Dispatch<React.SetStateAction<boolean>>;
  venue: string;
  setVenue: React.Dispatch<React.SetStateAction<string>>;
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  zip: number;
  setZip: React.Dispatch<React.SetStateAction<number>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  signUp: string;
  setSignUp: React.Dispatch<React.SetStateAction<string>>;
  start: string;
  setStart: React.Dispatch<React.SetStateAction<string>>;
  stop: string;
  setStop: React.Dispatch<React.SetStateAction<string>>;
  resetEvent: () => void;
  createEvent: (data: EventType) => Promise<void>;
  updateEvent: (data?: EventType) => Promise<void>;
  getAllEvents: () => Promise<void>;
  deleteEvent: () => void;
}

export interface EventType {
  id?: string;
  user_id?: string;
  venue: string;
  street: string;
  city: string;
  state: string;
  zip: number | "ZIP Code" | "";
  date: string; // "YYYY-MM-DD"
  sign_up: string; // "HH:mm"
  start: string;
  stop: string;
  allEvents: EventType;
  // attendees: Attendee[];
}

export interface Attendee {
  id?: string;
  user_id?: string;
  name: string;
  status: AttendanceStatus;
  email?: string;
}

export type AttendanceStatus = "A" | "M" | "N" | "C";
