// src/pages/Dashboard/Right_Dash/RightDash.tsx
import React from "react";
import { useEvent } from "../../../contexts/EventContexts";
import { RightStatic } from "./RightStatic/RightStatic";
import { CreateEvent } from "./CreateEvent/CreateEvent";
import { ControlPanel } from "../ControlPanel/ControlPanel";

import "../../../index.css";
import "../../../pages/Dashboard/Dashboard.css";
import "./RightDash.css";

export const RightDash: React.FC = () => {
  const { event } = useEvent();

  return (
    <section className="right-section">
      {!event ? <RightStatic /> : <CreateEvent />}
      <ControlPanel />
    </section>
  );
};
