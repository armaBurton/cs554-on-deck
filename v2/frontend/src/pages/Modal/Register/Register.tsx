// src/pages/SignUp/SignUp.tsx
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import "../Modal.css";

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validate, setValidate] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [stageName, setStageName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== validate) {
      console.log("Passwords do not match");
      setPassword("");
      setValidate("");
      return;
    }

    try {
      await register(email, password, firstName, lastName, stageName);
      navigate("/dashboard");
    } catch (err: any) {
      setError((await err.message) || "Failed to register");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(`Register`);

  return (
    <>
      <section className="modal-background">
        <div className="modal">
          <h1>On Deck</h1>
          <h3>Create an Account</h3>
          <form
            className="modal-form"
            onSubmit={handleSubmit}
          >
            <div className="modal-form-group email-group">
              {/* <label className="modal-label">First Name</label> */}
              <input
                type="email"
                className="modal-input email-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="modal-form-group password-group">
              <input
                type="password"
                className="modal-input password-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="modal-form-group password-group validate-group">
              <input
                type="password"
                className="modal-input password-input validate-input"
                placeholder="Validate"
                value={validate}
                onChange={(e) => setValidate(e.target.value)}
                required
              />
            </div>

            {/* <div className="break">
              <p>optional</p>
            </div>

            <div className="modal-form-group text-group first-name-group">
              <input
                type="text"
                className="modal-input first-name-input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="modal-form-group text-group last-name-group">
              <input
                type="text"
                className="modal-input last-name-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="modal-form-group text-group stage-name-group">
              <input
                type="text"
                className="modal-input stage-name-input"
                placeholder="Stage Name"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
              />
            </div> */}
            <div className="button-div">
              <button
                className="modal-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Register"}
              </button>
              <button
                className="modal-button"
                onClick={() => navigate("/validate")}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
