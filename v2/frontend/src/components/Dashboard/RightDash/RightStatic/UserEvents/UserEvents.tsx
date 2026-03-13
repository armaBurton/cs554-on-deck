// v2\frontend\src\components\Dashboard\RightDash\RightStatic\UserEvents\UserEvents.tsx
import { useEvent } from "../../../../../contexts/EventContext";
import { useProfile } from "../../../../../contexts/ProfileContext";
import type { EventType } from "../../../../../interface/types";
import { UserCreatedEvents } from "../../../UserCreatedEvents/UserCreatedEvents";

export const UserEvents = () => {
  const { allEvents } = useEvent();
  const { profile } = useProfile();

  return (
    <div className="attendance">
      {allEvents
        .filter((event: EventType) => event.user_id === profile?.id)
        .map((event) => (
          <UserCreatedEvents
            event={event}
            key={event.id}
          />
        ))}
    </div>
  );
};
