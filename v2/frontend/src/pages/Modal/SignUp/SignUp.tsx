// src/pages/SignUp/SignUp.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContexts";
import "../Modal.css";

export const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");

  const navigate = useNavigate();

  return (
    <>
      <section className="modal-background">
        <div className="modal">
          <h1>On Deck</h1>
          <h3>Create an Account</h3>
          <form className="modal-form">
            <div className="modal-form-group">
              {/* <label className="modal-label">First Name</label> */}
              <input
                type="email"
                className="modal-input first-name"
                placeholder="Email"
                required
              />
            </div>

            <div className="modal-form-group">
              {/* <label className="modal-label">Last Name</label> */}
              <input
                type="password"
                className="modal-input password"
                placeholder="Create Password"
                required
              />
            </div>

            <div className="modal-form-group">
              {/* <label className="modal-label">Stage Name</label> */}
              <input
                type="password"
                className="modal-input password"
                placeholder="Validate Password"
                required
              />
            </div>
          </form>

          <div className="button-div">
            <button
              className="modal-button"
              onClick={() => navigate("/on-deck")}
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
