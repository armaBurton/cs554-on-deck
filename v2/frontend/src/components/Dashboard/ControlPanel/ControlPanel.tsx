// src/components/Dashboard/ControlPanel/ControlPanel.tsx
import React from "react";
import { CurrentEvents } from "../RightDash/RightStatic/CurrentEvents/CurrentEvents";
import { PastEvents } from "../RightDash/RightStatic/PastEvents/PastEvents";
import { AttendedEvents } from "../RightDash/RightStatic/AttendedEvents/AttendedEvents";
import { UserEventsControlPanel } from "../RightDash/RightStatic/UserEventsControlPanel/UserEventsControlPanel";
import { useEvent } from "../../../contexts/EventContext";

import "./ControlPanel.css";
import { RightController } from "../RightDash/RightController/RightController";

export const ControlPanel: React.FC = () => {
  const { current, past } = useEvent();

  return (
    <div className="event-creation-container">
      <RightController />
      {current && !past ? (
        <CurrentEvents />
      ) : !current && past ? (
        <PastEvents />
      ) : (
        <AttendedEvents />
      )}
      <UserEventsControlPanel />
    </div>
  );
};
