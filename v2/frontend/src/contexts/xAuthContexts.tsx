// src/contexts/AuthContexts.tsx
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import { supabase } from "../lib/supabase";
import type { AuthContextType, ProfileType } from "../interface/types";
import type { User, Session } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    stageName?: string,
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName || "",
          last_name: lastName || "",
          stage_name: stageName || "",
        },
      },
    });

    if (error) throw error;
  };

  const validate = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const handleProfileUpdate = async (
    firstName: string,
    lastName: string,
    stageName: string,
  ) => {
    if (!user) throw new Error("No user logged in");
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      stage_name: stageName,
    });
    if (error) throw error;
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            first_name: firstName,
            last_name: lastName,
            stage_name: stageName,
          }
        : null,
    );
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      setUser,
      session,
      setSession,
      profile,
      setProfile,
      loading,
      setLoading,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      stageName,
      setStageName,
      // Methods
      register,
      validate,
      handleProfileUpdate,
      signOut,
    }),
    [user, session, profile, loading, firstName, lastName, stageName],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
