// src/contexts/AppContexts.tsx
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  createContext,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContexts";
import type { ProfileType } from "../interface/types";

export interface ProfileContextType {
  profile: ProfileType | null;
  loading: boolean;
  updateProfile: (
    firstName: string,
    lastName: string,
    stageName: string,
  ) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = useCallback(
    async (firstName: string, lastName: string, stageName: string) => {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        stage_name: stageName,
      });

      if (error) throw error;

      setProfile({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        stage_name: stageName,
      } as ProfileType);
    },
    [user],
  );

  const value = useMemo(
    () => ({
      profile,
      loading,
      updateProfile,
    }),
    [profile, loading, updateProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// export const useProfile = () => {
//   const context = useContext(ProfileContext);

//   if (!context)
//     throw new Error("useProfile must be used within a ProfileProvider");
//   return context;
// };
