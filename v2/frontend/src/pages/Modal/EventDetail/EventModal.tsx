// v2\frontend\src\pages\Modal\EventDetail\EventDetail.tsx
import { useEvent } from "../../../contexts/EventContext";
import { useProfile } from "../../../contexts/ProfileContext";
import { manageTime, manageDate, getName } from "../../../services/services";
import { EventsController } from "../../../components/Dashboard/LeftDash/EventsController/EventsController";
import type { EventType } from "../../../interface/types";
import "./EventModal.css";

type Props = {
  event: EventType;
};

export const EventModal = ({ event }: Props) => {
  const { viewDetails, setViewDetails } = useEvent();
  const { users } = useProfile();

  const organizer = users.find((u) => u.id === event.user_id);

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };

  return (
    <div>
      <div
        className="modal-background"
        onClick={toggleDetails}
      >
        <div>
          <div className="modal event-modal">
            <div className="event-details">
              <div className="left-location">
                <p>date</p>
                <p>venue</p>
                <p>location</p>

                <br />
                <br />
                <p>sign up</p>
                <p>start time</p>
                <p>end time</p>

                <br />
                <p>organizer</p>
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
                <br />
                <p>{organizer && getName(organizer)}</p>
              </div>
            </div>
            <EventsController event={event} />
          </div>
        </div>
      </div>
    </div>
  );
};
