// v2\frontend\src\components\Dashboard\UserCreatedEvents\UserCreatedEvents.tsx
import { useEvent } from "../../../contexts/EventContext";
// import { useProfile } from "../../../contexts/ProfileContext";
import type { EventType } from "../../../interface/types";
import { EventModal } from "../../../pages/Modal/EventDetail/EventModal";

type UserCreatedEventsProps = {
  event: EventType;
};

export const UserCreatedEvents = ({ event }: UserCreatedEventsProps) => {
  const { viewDetails, setViewDetails } = useEvent();

  const handleClick = () => {
    setViewDetails(!viewDetails);
    console.log(viewDetails);
  };

  return (
    <div
      className="event-container"
      onClick={handleClick}
    >
      {viewDetails ? <EventModal event={event} /> : <></>}
      <p>
        {event.venue} @ {event.date}
        sign up: {event.sign_up}, start: {event.start}
      </p>
    </div>
  );
};
