// v2\frontend\src\components\Dashboard\RightDash\RightStatic\UserEvents\UserEvents.tsx
import { useEvent } from "../../../../../contexts/EventContext";
import { useProfile } from "../../../../../contexts/ProfileContext";
import type { EventType } from "../../../../../interface/types";
import { UserCreatedEvents } from "../../../UserCreatedEvents/UserCreatedEvents";

export const UserEvents = () => {
  const { allEvents } = useEvent();
  const { profile } = useProfile();

  return (
    <>
      {/* <p className="roster">On-Deck</p> */}
      <div className="attendance">
        {allEvents.map((event: EventType) => {
          if (event.user_id === profile?.id) console.log("attendance: ", event);

          return event.user_id === profile?.id ? (
            <UserCreatedEvents
              event={event}
              key={event.id}
            />
          ) : (
            <></>
          );
        })}
      </div>
    </>
  );
};
