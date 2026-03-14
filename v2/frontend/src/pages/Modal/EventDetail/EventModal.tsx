// v2\frontend\src\pages\Modal\EventDetail\EventDetail.tsx
import { useEvent } from "../../../contexts/EventContext";
import { manageTime } from "../../../services/services";
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

  // const manageTime = (time: string) => {
  //   time.split(":");
  //   const split = time.split(":");
  //   console.log("Split: ", split[0]);
  //   if (split[0] > "12") {
  //     const val = Number(split[0]) - 12;

  //     split[0] = val.toString();

  //     return `${split[0]}:${split[1]} pm`;
  //   } else if (split[0] === "12") {
  //     return `${split[0]}:${split[1]} pm`;
  //   } else {
  //     return `${split[0]}:${split[1]} am`;
  //   }
  // };

  return (
    <div
      className="modal-background"
      onClick={toggleDetails}
    >
      <div className="modal event-modal">
        <div className="left-location">
          <p>venue</p>
          <p>location</p>

          <br />
          <br />
          <p>sign up</p>
          {/* <p>
            venue: <span className="noun">{event.venue}</span> date:{" "}
            <span className="noun">{event.date}</span>
          </p>
          <p>
            location:{" "}
            <span className="noun">
              {event.street}
              <p /> {event.city}, {event.state}
            </span>
          </p>
          <p>
            sign up: <span className="noun">{manageTime(event.sign_up)}</span>
          </p> */}
        </div>
        <div className="right-location">
          <p>{event.venue}</p>
          <p>{event.street}</p>
          <p>{`${event.city}, ${event.state}`}</p>
          <br />
          <p>{manageTime(event.sign_up)}</p>
        </div>
      </div>
    </div>
  );
};
