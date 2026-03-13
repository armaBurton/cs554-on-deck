// v2\frontend\src\components\Dashboard\UserCreatedEvents\UserCreatedEvents.tsx
import { useState } from "react";
// import { useEvent } from "../../../contexts/EventContext";
// import { useProfile } from "../../../contexts/ProfileContext";
import type { EventType } from "../../../interface/types";
import { EventModal } from "../../../pages/Modal/EventDetail/EventModal";

type UserCreatedEventsProps = {
  event: EventType;
};

export const UserCreatedEvents = ({ event }: UserCreatedEventsProps) => {
  const [viewDetails, setViewDetails] = useState(false);

  const handleClick = () => {
    setViewDetails(!viewDetails);
  };
  console.log(event);

  return (
    <div
      className="event-container"
      onClick={handleClick}
    >
      {viewDetails && <EventModal event={event} />}
      <p>
        {event.venue} @ {event.date}
        sign up: {event.sign_up}, start: {event.start}
      </p>
    </div>
  );
};
