// src/context/EventContexts.tsx
import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
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
  const [zip, setZip] = useState<number | "ZIP Code">("ZIP Code");
  const [date, setDate] = useState<string>(""); // YYYY:MM:DD
  const [signUp, setSignUp] = useState<string>(""); // "HH:mm"
  const [start, setStart] = useState<string>("");
  const [stop, setStop] = useState<string>("");
  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [current, setCurrent] = useState<boolean>(true);
  const [past, setPast] = useState<boolean>(false);
  // const [];

  const { user, session } = useAuth();

  const resetEvent = useCallback(() => {
    setError("");
    setLoading(false);
    setId("");
    setEvent(false);
    setVenue("");
    setStreet("");
    setCity("");
    setState("");
    setZip("ZIP Code");
    setDate("");
    setSignUp("");
    setStart("");
    setStop("");
    setViewDetails(false);
    setCurrent(true);
    setPast(false);
  }, []);

  const createEvent = useCallback(
    async (data: EventType): Promise<void> => {
      data.user_id = user?.id;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { allEvents, ...eventData } = data;

      const { error } = await supabase.from("events").insert(eventData);

      if (error) throw error;
    },
    [user],
  );

  const updateEvent = useCallback(async (data: EventType): Promise<void> => {
    console.log("updateEvent: ", data);
  }, []);

  const getAllEvents = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase.from("events").select("*");

    if (error) throw error;

    setAllEvents(data ?? []);
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
      allEvents,
      setAllEvents,
      viewDetails,
      setViewDetails,
      resetEvent,
      createEvent,
      updateEvent,
      getAllEvents,
      deleteEvent,
      current,
      setCurrent,
      past,
      setPast,
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
      allEvents,
      setAllEvents,
      viewDetails,
      setViewDetails,
      resetEvent,
      createEvent,
      updateEvent,
      getAllEvents,
      deleteEvent,
      current,
      setCurrent,
      past,
      setPast,
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
