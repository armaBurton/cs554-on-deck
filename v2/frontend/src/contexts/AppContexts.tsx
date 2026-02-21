// src/contexts/AppContexts.tsx
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";

const AppContext = createContext<undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return <AppContext.Provider >{children}</AppContext.Provider>};
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) 
    throw new Error("useApp must be used within an AppProvider")

  return context;
}