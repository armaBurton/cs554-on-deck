// src/context/EventContexts.tsx
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  createContext,
  useCallback,
} from "react";

import type { EventContextType, EventPayload } from "../interface/types";

// eslint-disable-next-line react-refresh/only-export-components
export const EventContext = createContext<EventContextType | undefined>(
  undefined,
);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState<string>("");
  const [event, setEvent] = useState<boolean>(false);
  const [venue, setVenue] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [signUpTime, setSignUpTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [stopTime, setStopTime] = useState<number>(0);

  const resetEvent = useCallback(() => {
    setId("");
    setEvent(false);
    setVenue("");
    setStreet("");
    setCity("");
    setState("");
    setDate("");
    setSignUpTime(0);
    setStartTime(0);
    setStopTime(0);
  }, []);

  const createEvent = useCallback(async (data: EventPayload): Promise<void> => {
    const { id, venue, address, date, signUpTime, startTime, stopTime } = data;
    console.log(id, venue, address, date, signUpTime, startTime, stopTime);
  }, []);

  // const createEvent = useCallback(
  //   async ({
  //     id,
  //     venue,
  //     street,
  //     city,
  //     state,
  //     date,
  //     signUpTime,
  //     startTime,
  //     stopTime,
  //   }: EventPayload) => {
  //     console.log(
  //       id,
  //       venue,
  //       street,
  //       city,
  //       state,
  //       date,
  //       signUpTime,
  //       startTime,
  //       stopTime,
  //     );
  //   },
  //   [],
  // );
  const updateEvent = useCallback(async (data: EventPayload): Promise<void> => {
    const { id, venue, address, date, signUpTime, startTime, stopTime } = data;
    console.log(id, venue, address, date, signUpTime, startTime, stopTime);
  }, []);
  // const updateEvent = useCallback(
  //   async ({
  //     id,
  //     venue,
  //     street,
  //     city,
  //     state,
  //     date,
  //     signUpTime,
  //     startTime,
  //     stopTime,
  //   }: EventContextType) => {
  //     console.log(
  //       id,
  //       venue,
  //       street,
  //       city,
  //       state,
  //       date,
  //       signUpTime,
  //       startTime,
  //       stopTime,
  //     );
  //   },
  //   [],
  // );

  const deleteEvent = useCallback(() => {}, []);

  const value = useMemo(
    () => ({
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
      signUpTime,
      setSignUpTime,
      startTime,
      setStartTime,
      stopTime,
      setStopTime,
      resetEvent,
      createEvent,
      updateEvent,
      deleteEvent,
    }),
    [
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
      signUpTime,
      setSignUpTime,
      startTime,
      setStartTime,
      stopTime,
      setStopTime,
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
