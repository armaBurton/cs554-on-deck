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
import { useAuth } from "./AuthContext";
import type { ProfileType, ProfileContextType } from "../interface/types";
import type { User } from "@supabase/supabase-js";

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [updating, setUpdating] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");
  const [users, setUsers] = useState<ProfileType[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(null);
      setUpdating(false);
      return;
    }

    const fetchProfile = async () => {
      setUpdating(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {
        setProfile(data);
      }

      setUpdating(false);
    };

    fetchProfile();
  }, [user]);

  const getAllUsers = useCallback(async (): Promise<void> => {
    setLoadingUsers(true);

    const { data, error } = await supabase.from("profiles").select("*");

    if (error) throw error;

    setUsers(data ?? []);

    setLoadingUsers(false);
  }, []);

  const updateProfile = useCallback(
    async (
      user: User,
      firstName: string,
      lastName: string,
      stageName: string,
    ) => {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        stage_name: stageName,
      });

      if (error) throw error;

      setProfile({
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        stage_name: stageName,
      } as ProfileType);

      getAllUsers();
    },
    [],
  );

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      updating,
      setUpdating,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      stageName,
      setStageName,
      updateProfile,
      users,
      loadingUsers,
      getAllUsers,
    }),
    [
      profile,
      setProfile,
      updating,
      setUpdating,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      stageName,
      setStageName,
      updateProfile,
      users,
      loadingUsers,
      getAllUsers,
    ],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context)
    throw new Error("useProfile must be used within a ProfileProvider");

  return context;
};
