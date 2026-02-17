// src/components/Hamburger/Hamburger.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import "./Hamburger.css";
// import type { HamburgerProps } from "../../types/types";

export const Hamburger: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/welcome");
  };

  return (
    <div className="hamburger-container">
      <button
        className="hamburger-icon"
        onClick={handleClick}
      >
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
      </button>

      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#"></a>Profile
          </li>
          <li>
            <a
              href="#"
              onClick={handleSignOut}
            >
              Log Out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
