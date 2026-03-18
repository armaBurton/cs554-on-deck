// v2\frontend\src\components\Dashboard\LeftDash\EventsController\EventController.tsx
import { useAttendance } from "../../../../contexts/AttendanceContext";
// import { useProfile } from "../../../../contexts/ProfileContext";
// import { useEvent } from "../../../../contexts/EventContext";
import "./EventsController.css";

type Props = {
  event: EventType;
};

export const EventsController = ({ event }: Props) => {
  const { attendance, upsertAttendance } = useAttendance();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("handleAdd");
    upsertAttendance(event.id, event.status);
  };

  return (
    <section className="event-modal-controller">
      <button onClick={handleAdd}>Add</button>
      <button>Cancel</button>
    </section>
  );
};
