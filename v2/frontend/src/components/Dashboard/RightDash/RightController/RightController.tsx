// v2\frontend\src\components\Dashboard\RightDash\RightController\RightController.tsx
import { useEvent } from "../../../../contexts/EventContext";

import "./RightController.css";

export const RightController = () => {
  const { current, setCurrent, past, setPast } = useEvent();

  const handleCurrent = () => {
    setCurrent(true);
    setPast(false);
  };

  const handlePast = () => {
    setCurrent(false);
    setPast(true);
  };

  const handleAttended = () => {
    setCurrent(false);
    setPast(false);
  };
  console.log("HANDLE ATTENDED --> CURRENT: ", current, " PAST: ", past);

  return (
    <section className="right-controller">
      <button onClick={handleCurrent}>Current</button>
      <button onClick={handlePast}>Past</button>
      <button onClick={handleAttended}>Attended</button>
    </section>
  );
};
