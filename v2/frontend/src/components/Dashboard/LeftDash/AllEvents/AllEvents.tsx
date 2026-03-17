// v2\frontend\src\components\Dashboard\LeftDash\CurrentEvents\CurrentEvents.tsx
import React, { useEffect } from "react";
import { useProfile } from "../../../../contexts/ProfileContext";
// import { UserEvents } from "../../RightDash/RightStatic/CurrentEvents/CurrentEvents";
import { useEvent } from "../../../../contexts/EventContext";
import { UserCreatedEvents } from "../../UserCreatedEvents/UserCreatedEvents";

import "./AllEvents.css";

export const CurrentEvents: React.FC = () => {
  const { allEvents, getAllEvents } = useEvent();
  const { users } = useProfile();

  useEffect(() => {
    const getAll = async () => {
      await getAllEvents();
    };

    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="current-events">
      {allEvents
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((event) => (
          <UserCreatedEvents
            event={event}
            key={event.id}
          />
        ))}
    </div>
  );
};
