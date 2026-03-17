// v2\frontend\src\components\Dashboard\LeftDash\LeftDash.tsx
import { CurrentEvents } from "./AllEvents/AllEvents";
import "./LeftDash.css";

export const LeftDash = () => {
  return (
    <section className="left-section">
      <CurrentEvents />
    </section>
  );
};
