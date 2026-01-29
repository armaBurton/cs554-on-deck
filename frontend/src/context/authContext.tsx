// src/context/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../client/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

const AuthContext = createContext<{
  session: Session | null;
  user: User | null;
}>({
  session: null,
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: any, session: Session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.User ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
