// v2\frontend\src\pages\Modal\EventDetail\EventDetail.tsx
import { useEvent } from "../../../contexts/EventContext";
import { manageTime, manageDate } from "../../../services/services";
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
      <div className="modal event-modal">
        <div className="left-location">
          <p>date</p>
          <p>venue</p>
          <p>location</p>

          <br />
          <br />
          <p>sign up</p>
          <p>start time</p>
          <p>end time</p>
        </div>
        <div className="right-location">
          <p>{manageDate(event.date)}</p>
          <p>{event.venue}</p>
          <p>{event.street}</p>
          <p>{`${event.city}, ${event.state}`}</p>
          <br />
          <p>{manageTime(event.sign_up)}</p>
          <p>{manageTime(event.start)}</p>
          <p>{manageTime(event.stop)}</p>
        </div>
      </div>
    </div>
  );
};
