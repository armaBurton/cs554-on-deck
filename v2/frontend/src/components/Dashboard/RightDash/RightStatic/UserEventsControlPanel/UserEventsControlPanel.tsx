// v2\frontend\src\components\Dashboard\RightDash\RightStatic\UserEventsControlPanel\UserEventsControlPanel.tsx
import { useEvent } from "../../../../../contexts/EventContext";

export const UserEventsControlPanel = () => {
  const { event, setEvent } = useEvent();

  return (
    <div className="event-creation-panel">
      <button
        onClick={() => {
          setEvent(!event);
        }}
        disabled={event}
      >
        Create Event
      </button>
      <button disabled={event}>Find Event</button>
      <button disabled={event}>Something Else</button>
    </div>
  );
};
