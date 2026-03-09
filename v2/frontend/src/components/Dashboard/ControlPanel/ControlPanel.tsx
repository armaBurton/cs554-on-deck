// src/components/Dashboard/ControlPanel/ControlPanel.tsx
import React from "react";
// import { useEvent } from "../../../contexts/EventContext";
import { UserEvents } from "../RightDash/RightStatic/UserEvents/UserEvents";
import { UserEventsControlPanel } from "../RightDash/RightStatic/UserEventsControlPanel/UserEventsControlPanel";

import "./ControlPanel.css";

export const ControlPanel: React.FC = () => {
  return (
    <div className="event-creation-container">
      <UserEvents />
      <UserEventsControlPanel />
    </div>
  );
};
