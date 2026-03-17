// v2\frontend\src\components\Dashboard\RightDash\RightStatic\PastEvents\PastEvents.tsx
import { useEvent } from "../../../../../contexts/EventContext";
import { useProfile } from "../../../../../contexts/ProfileContext";
import type { EventType } from "../../../../../interface/types";
import { UserCreatedEvents } from "../../../UserCreatedEvents/UserCreatedEvents";

export const PastEvents = () => {
  const { allEvents, viewDetails } = useEvent();
  const { profile } = useProfile();

  return (
    <div className="attendance">
      {allEvents
        .filter((event: EventType) => event.user_id === profile?.id)
        .filter((event) => event.date < new Date().toISOString().split("T")[0])
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((event) => (
          <UserCreatedEvents
            event={event}
            key={event.id}
          />
        ))}
    </div>
  );
};
