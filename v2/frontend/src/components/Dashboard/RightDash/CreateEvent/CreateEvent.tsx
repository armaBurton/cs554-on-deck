// src/components/Dashboard/RightDash/CreateEvent/CreateEvent.tsx
import React from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useEvent } from "../../../../contexts/EventContext";
import { states } from "../../../../services/states";
import "../RightDash.css";
import "./CreateEvent.css";
import type { EventType } from "../../../../interface/types";

export const CreateEvent: React.FC = () => {
  const { user, session } = useAuth();
  const {
    error,
    setError,
    loading,
    setLoading,
    event,
    setEvent,
    venue,
    setVenue,
    street,
    setStreet,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    date,
    setDate,
    signUp,
    setSignUp,
    start,
    setStart,
    stop,
    setStop,
    createEvent,
    allEvents,
    getAllEvents,
  } = useEvent();

  const checkForState = () => {
    return states.includes(state);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!checkForState()) {
      throw new Error("State Not Found");
    }

    const data: EventType = {
      venue: venue,
      street: street,
      city: city,
      state: state,
      zip: zip,
      date: date,
      sign_up: signUp,
      start: start,
      stop: stop,
      allEvents: allEvents,
    };

    createEvent(data);
    await getAllEvents();
    setEvent(!event);
    setLoading(false);
  };

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
        onSubmit={handleSubmit}
        className="creation-form"
      >
        <input
          type="text"
          placeholder="Venue"
          className="event-input venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <div className="spacer" />
        <input
          type="text"
          placeholder="Street Address"
          className="event-input street-address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          className="event-input city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          className="event-input state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        {/* <input
          type="zipcode"
          placeholder="ZipCode"
          className="event-input zip"
        /> */}
        <input
          type="number"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => {
            setZip(Number(e.target.value));
          }}
          className="event-input zip-code"
          title="Enter a five-digit ZIP code or a ZIP+4 code (e.g., 12345 or 12345-6789)"
          required
        />
        <input
          type="date"
          placeholder="Date"
          className="event-input date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div className="spacer" />
        <p>Sign Ups Start</p>
        <input
          type="time"
          placeholder="Sign Ups"
          className="event-input sign-up"
          value={signUp}
          onChange={(e) => setSignUp(e.target.value)}
          required
        />
        <p>Start Time</p>
        <input
          type="time"
          placeholder="Start Time"
          className="event-input start-time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <p>End Time</p>
        <input
          type="time"
          placeholder="Stop Time"
          className="event-input end-time"
          value={stop}
          onChange={(e) => setStop(e.target.value)}
          required
        />
        <div className="sub-panel">
          <button type="submit">Create</button>
          <button onClick={() => setEvent(false)}>Cancel</button>
        </div>
      </form>
    </section>
  );
};
