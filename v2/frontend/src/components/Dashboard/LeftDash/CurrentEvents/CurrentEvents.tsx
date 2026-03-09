// v2\frontend\src\components\Dashboard\LeftDash\CurrentEvents\CurrentEvents.tsx
import React, { useEffect } from "react";

import { useEvent } from "../../../../contexts/EventContext";

import "./CurrentEvents.css";

export const CurrentEvents: React.FC = () => {
  const { getAllEvents } = useEvent();

  useEffect(() => {
    const getAll = async () => {
      await getAllEvents();
    };

    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="current-events"></div>;
};
