// v2\frontend\src\pages\Modal\EventDetail\EventDetail.tsx
import { useEvent } from "../../../contexts/EventContext";
import type { EventType } from "../../../interface/types";
import "./EventModal.css";

type Props = {
  event: EventType;
};

export const EventModal = ({ event }: Props) => {
  const { viewDetails, setViewDetails } = useEvent();

  const toggleDetails = () => {
    console.log(event);
    setViewDetails(!viewDetails);
  };

  return (
    <div
      className="modal-background"
      onClick={toggleDetails}
    >
      <div className="modal">
        <p>
          venue: <span className="noun">{event.venue}</span>
        </p>
        <p>
          address:{" "}
          <span className="noun">
            {event.street} {event.city}, {event.state}
          </span>
        </p>
      </div>
    </div>
  );
};
