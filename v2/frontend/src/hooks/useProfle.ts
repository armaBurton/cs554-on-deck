// src/contexts/useProfile.ts
import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContexts";
import type { ProfileContextType } from "../contexts/ProfileContexts";

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);

  if (!context)
    throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
