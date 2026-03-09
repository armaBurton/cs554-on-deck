// v2\frontend\src\components\Dashboard\RightDash\RightStatic\UserEvents\UserEvents.tsx
import { useEvent } from "../../../../../contexts/EventContext";
import type { EventType } from "../../../../../interface/types";

export const UserEvents = () => {
  const { allEvents } = useEvent();

  return (
    <>
      <p className="roster">On-Deck</p>
      <div className="attendance">
        {allEvents.map((event: EventType) => {
          console.log("UserEvents: ", event);
        })}
      </div>{" "}
    </>
  );
};
