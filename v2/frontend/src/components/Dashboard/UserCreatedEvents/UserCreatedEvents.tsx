// v2\frontend\src\components\Dashboard\UserCreatedEvents\UserCreatedEvents.tsx
// import { useEvent } from "../../../contexts/EventContext";
// import { useProfile } from "../../../contexts/ProfileContext";
import type { EventType } from "../../../interface/types";

type UserCreatedEventsProps = {
  event: EventType;
};

const handleClick = () => {
  console.log("click");
};

export const UserCreatedEvents = ({ event }: UserCreatedEventsProps) => {
  return (
    <div
      className="event-container"
      onClick={handleClick}
    >
      <p>
        {event.venue} @ {event.date}
        sign up: {event.sign_up}, start: {event.start}
      </p>
    </div>
  );
};
