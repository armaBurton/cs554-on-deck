// v2\frontend\src\components\Dashboard\LeftDash\LeftDash.tsx
import { CurrentEvents } from "./CurrentEvents/CurrentEvents";
import "./LeftDash.css";

export const LeftDash = () => {
  return (
    <section className="left-section">
      <CurrentEvents />
    </section>
  );
};
