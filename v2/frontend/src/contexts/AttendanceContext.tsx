// v2\frontend\src\contexts\AttendanceContext.tsx
import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";
import type {
  AttendanceContextType,
  AttendanceStatus,
  EventAttendanceType,
} from "../interface/types";

// eslint-disable-next-line react-refresh/only-export-components
export const AttendanceContext = createContext<
  AttendanceContextType | undefined
>(undefined);

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<EventAttendanceType[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);

  const getMyAttendance = useCallback(async (): Promise<void> => {
    if (!user) return;

    setLoadingAttendance(true);

    const { data, error } = await supabase
      .from("event_attendance")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw error;

    setAttendance(data ?? []);
    setLoadingAttendance(false);
  }, [user]);

  const upsertAttendance = useCallback(
    async (eventId: string, status: AttendanceStatus): Promise<void> => {
      if (!user) return;

      const { error } = await supabase.from("event_attendance").upsert(
        {
          event_id: eventId,
          user_id: user.id,
          status,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "event_id,user_id" },
      );

      if (error) throw error;

      // Update local state
      setAttendance((prev) => {
        const existing = prev.find((a) => a.event_id === eventId);
        if (existing) {
          return prev.map((a) =>
            a.event_id === eventId ? { ...a, status } : a,
          );
        }
        return [...prev, { event_id: eventId, user_id: user.id, status }];
      });
    },
    [user],
  );

  const deleteAttendance = useCallback(
    async (eventId: string): Promise<void> => {
      if (!user) return;

      const { error } = await supabase
        .from("event_attendance")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", user.id);

      if (error) throw error;

      setAttendance((prev) => prev.filter((a) => a.event_id !== eventId));
    },
    [user],
  );

  const isEventCurrent = useCallback((date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }, []);

  const getStatusForEvent = useCallback(
    (eventId: string): AttendanceStatus | null => {
      return attendance.find((a) => a.event_id === eventId)?.status ?? null;
    },
    [attendance],
  );

  const value = useMemo(
    () => ({
      attendance,
      loadingAttendance,
      getMyAttendance,
      upsertAttendance,
      deleteAttendance,
      isEventCurrent,
      getStatusForEvent,
    }),
    [
      attendance,
      loadingAttendance,
      getMyAttendance,
      upsertAttendance,
      deleteAttendance,
      isEventCurrent,
      getStatusForEvent,
    ],
  );

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context)
    throw new Error("useAttendance must be used within an AttendanceProvider");
  return context;
};
