// v2\frontend\src\components\Dashboard\UserCreatedEvents\UserCreatedEvents.tsx
import { useEvent } from "../../../contexts/EventContext";
import { useProfile } from "../../../contexts/ProfileContext";
import type { EventType } from "../../../interface/types";

type UserCreatedEventsProps = {
  event: EventType;
};

export const UserCreatedEvents = ({ event }: UserCreatedEventsProps) => {
  const { allEvents } = useEvent();
  const { profile } = useProfile();

  console.log("UserEvents.allEvents: ", allEvents);
  console.log("UserEvents.profile: ", profile);
  console.log("UserEvents.event: ", event.city);

  return (
    <div className="event-container">
      <p>
        {event.venue} @ {event.date}
        sign up: {event.sign_up}, start: {event.start}
      </p>
    </div>
  );
};
