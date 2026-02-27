// src/components/Dashboard/RightDash/CreateEvent/CreateEvent.tsx
import React from "react";
import "../RightPanels.css";

export const CreateEvent: React.FC = () => {
  return (
    <section className="right-static">
      <div className="right-dash-header dash-header">
        <p className="right-section-text dash-text">
          <span className="right-section-emphasis dash-emphasis text-bigger">
            create new event
          </span>
        </p>
      </div>
      <form
        action="submit"
        className="creation-form"
      >
        <input
          type="text"
          placeholder="Where is the event being held?"
          className="event-input venue"
        />
        <div className="spacer" />
        <input
          type="text"
          placeholder="Street Address"
          className="event-input street-address"
        />
        <input
          type="text"
          placeholder="City"
          className="event-input city"
        />
        <input
          type="text"
          placeholder="State"
          className="event-input state"
        />
        <input
          type="number"
          placeholder="ZipCode"
          className="event-input zip"
        />
        <input
          type="date"
          placeholder="Date"
          className="event-input date"
        />
        <div className="spacer" />
        <p>Sign Ups Start</p>
        <input
          type="time"
          placeholder="Sign Ups"
          className="event-input sign-up"
        />
        <p>Start Time</p>
        <input
          type="time"
          placeholder="Start Time"
          className="event-input start-time"
        />
        <p>End Time</p>
        <input
          type="time"
          placeholder="End Time"
          className="event-input end-time"
        />
      </form>
    </section>
  );
};
