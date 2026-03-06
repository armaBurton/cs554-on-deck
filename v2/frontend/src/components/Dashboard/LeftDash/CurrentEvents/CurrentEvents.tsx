// v2\frontend\src\components\Dashboard\LeftDash\CurrentEvents\CurrentEvents.tsx
import React, { useEffect } from "react";

import { useEvent } from "../../../../contexts/EventContext";

import "./CurrentEvents.css";

export const CurrentEvents: React.FC = () => {
  const { getAllEvents } = useEvent();

  useEffect(() => {
    const getAll = async () => {
      // console.log("getAllEvents");
      await getAllEvents();
    };

    getAll();
  });
  return <div className="current-events"></div>;
};
