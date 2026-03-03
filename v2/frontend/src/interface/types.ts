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
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  signUpTime: TimeRanges;
  setSignUpTime: React.Dispatch<React.SetStateAction<TimeRanges>>;
  startTime: TimeRanges;
  setStartTime: React.Dispatch<React.SetStateAction<TimeRanges>>;
  stopTime: TimeRanges;
  setStopTime: React.Dispatch<React.SetStateAction<TimeRanges>>;
  resetEvent: () => void;
  createEvent: (data: EventPayload) => Promise<void>;
  updateEvent: (data?: EventPayload) => Promise<void>;
  deleteEvent: () => void;
}

export interface EventType {
  id?: string;
  user_id?: string;
  venue: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  date: string; // "YYYY-MM-DD"
  signUpTime: string; // "HH:mm"
  startTime: string;
  stopTime: string;
  attendees: Attendee[];
}

export interface Attendee {
  id?: string;
  user_id?: string;
  name: string;
  status: AttendanceStatus;
  email?: string;
}

export type AttendanceStatus = "A" | "M" | "N" | "C";
