// src/contexts/AuthContexts.tsx
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  createContext,
} from "react";
import { supabase } from "../lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { AuthContextType } from "../interface/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const accessToken =
  "eyJhbGciOiJFUzI1NiIsImtpZCI6IjA5Nzg4OWRmLTViMmYtNGIxMi1iMjRiLWEyNDIzNTk5NWU1NSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3hzb2x0cWFjb25qdnh5anpnbGtjLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhOGY1MzhmMS05YjhkLTQ1OGMtOTAwNi1jZjA3M2RjMmNlNDkiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcyMTc2NDE3LCJpYXQiOjE3NzIxNzI4MTcsImVtYWlsIjoibWVnYUBtYW4ucG93IiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Im1lZ2FAbWFuLnBvdyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImE4ZjUzOGYxLTliOGQtNDU4Yy05MDA2LWNmMDczZGMyY2U0OSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzcyMTcyODE3fV0sInNlc3Npb25faWQiOiIzNjUxZTliNS1mZjExLTQwZmItYWJhMC00ZGU0MmUxNzQ5NTgiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.ohXm4EmcKrpVFNgF6I9zAUMN9wZHkATpBKR5sWtZCPyS3QOjOlCRRhwHqzYfWrie0dzrmMqhy96v8eUZvU0zuA";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const validate = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // No need to manually remove tokens.
    // Supabase clears session storage automatically.
    setUser(null);
    setSession(null);
  };

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      register,
      validate,
      signOut,
    }),
    [user, session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
