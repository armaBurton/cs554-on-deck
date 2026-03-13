// v2\frontend\src\pages\Modal\EventDetail\EventDetail.tsx
import { useEvent } from "../../../contexts/EventContext";
import "./EventModal.css";

export const EventModal = (event) => {
  const { setViewDetails } = useEvent();

  const toggleDetails = () => {
    setViewDetails(false);
    console.log(event);
  };

  return (
    <div
      className="details true"
      onClick={toggleDetails}
    ></div>
  );
};
