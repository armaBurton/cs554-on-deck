// src/pages/Login/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Modal.css";

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="modal-background">
        <div className="modal">
          <h1>On Deck</h1>
          <h3>Select a login method</h3>
          <div className="button-div">
            <button
              className="modal-button"
              onClick={() => navigate("/validate")}
            >
              Returning Artist
            </button>
            <button
              className="modal-button"
              onClick={() => navigate("/register")}
            >
              New Performer
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
