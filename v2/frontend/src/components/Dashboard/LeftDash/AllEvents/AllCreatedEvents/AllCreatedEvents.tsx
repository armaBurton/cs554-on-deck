// v2\frontend\src\components\Dashboard\LeftDash\AllEvents\AllCreatedEvents\AllCreatedEvents.tsx
import { useState } from "react";
import type { EventType } from "../../../../../interface/types";

type AllCreatedEvents = {
  event: EventType;
};

export const AllCreatedEvents = ({ event }: AllCreatedEvents) => {
  const [viewDeets, setViewDeets] = useState<boolean>(false);

  const handleClick = () => {
    setViewDeets(!viewDeets);
  };

  return (
    <div
      className="All-Events"
      onClick={handleClick}
    ></div>
  );
};
