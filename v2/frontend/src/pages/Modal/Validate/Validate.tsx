// src/pages/Modal/Validate/Validate.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContexts";
import { supabase } from "../../../lib/supabase";
import "../Modal.css";
import "./Validate.css";

export const Validate: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { validate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getTicket = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) navigate("/dashboard");
    };

    getTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await validate(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="modal-background">
      <div className="modal">
        <h1>On Deck</h1>
        <h3>Welcome back!</h3>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group email-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="modal-form-group password-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="modal-form-group password-group">
            <input className="invisible" />
          </div>
          <div className="button-div">
            <button
              className="modal-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Enter"}
            </button>
            <button
              className="modal-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
