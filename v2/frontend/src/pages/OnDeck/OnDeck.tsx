// src/pages/Login/Login.tsx
import React, { useState } from "react";
import "./OnDeck.css";

export const OnDeck: React.FC = () => {
  return (
    <>
      <section className="login">
        <div className="modal">
          <h1>On Deck</h1>
          <div className="button-div">
            <button className="modal-button">Sign Up</button>
            <button className="modal-button">Sign In</button>
            <button className="modal-button">Google</button>
          </div>
        </div>
      </section>
    </>
  );
};
