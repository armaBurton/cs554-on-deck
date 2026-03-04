// src/context/EventContexts.tsx
import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { supabase } from "../lib/supabase";
import type {
  EventContextType,
  EventType,
  AttendeeType,
} from "../interface/types";

// eslint-disable-next-line react-refresh/only-export-components
export const EventContext = createContext<EventContextType | undefined>(
  undefined,
);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [event, setEvent] = useState<boolean>(false);
  const [venue, setVenue] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<number>(-1);
  const [date, setDate] = useState<string>(""); // YYYY:MM:DD
  const [signUp, setSignUp] = useState<string>(""); // "HH:mm"
  const [start, setStart] = useState<string>("");
  const [stop, setStop] = useState<string>("");

  const resetEvent = useCallback(() => {
    setError("");
    setLoading(false);
    setId("");
    setEvent(false);
    setVenue("");
    setStreet("");
    setCity("");
    setState("");
    setZip(-1);
    setDate("");
    setSignUp("");
    setStart("");
    setStop("");
  }, []);

  const createEvent = useCallback(async (data: EventType): Promise<void> => {
    console.log("createEvent: ");
    console.log(data);
  }, []);

  const updateEvent = useCallback(async (data: EventType): Promise<void> => {
    const { id, venue, date, signUp, start, stop } = data;
    console.log(id, venue, date, signUp, start, stop);
  }, []);

  const deleteEvent = useCallback(() => {}, []);

  const value = useMemo(
    () => ({
      error,
      setError,
      loading,
      setLoading,
      id,
      setId,
      event,
      setEvent,
      venue,
      setVenue,
      street,
      setStreet,
      city,
      setCity,
      state,
      setState,
      zip,
      setZip,
      date,
      setDate,
      signUp,
      setSignUp,
      start,
      setStart,
      stop,
      setStop,
      resetEvent,
      createEvent,
      updateEvent,
      deleteEvent,
    }),
    [
      error,
      setError,
      loading,
      setLoading,
      id,
      setId,
      event,
      setEvent,
      venue,
      setVenue,
      street,
      setStreet,
      city,
      setCity,
      state,
      setState,
      zip,
      setZip,
      date,
      setDate,
      signUp,
      setSignUp,
      start,
      setStart,
      stop,
      setStop,
      resetEvent,
      createEvent,
      updateEvent,
      deleteEvent,
    ],
  );

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context)
    throw new Error("useContext must be use within a EventProvider");

  return context;
};
