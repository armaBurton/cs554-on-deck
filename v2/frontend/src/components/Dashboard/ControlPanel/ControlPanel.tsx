// src/components/Dashboard/ControlPanel/ControlPanel.tsx
import React from "react";
import { useEvent } from "../../../contexts/EventContexts";

import "./ControlPanel.css";

export const ControlPanel: React.FC = () => {
  const { event, setEvent } = useEvent();

  return (
    <div className="event-creation-panel">
      <button
        onClick={() => {
          setEvent(!event);
        }}
      >
        Create Event
      </button>
      <button>Find Event</button>
      <button>Something Else</button>
    </div>
  );
};
