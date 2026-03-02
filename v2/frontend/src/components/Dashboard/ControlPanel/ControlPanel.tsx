// src/components/Dashboard/ControlPanel/ControlPanel.tsx
import React from "react";
import { useEvent } from "../../../contexts/EventContext";

import "./ControlPanel.css";

export const ControlPanel: React.FC = () => {
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
