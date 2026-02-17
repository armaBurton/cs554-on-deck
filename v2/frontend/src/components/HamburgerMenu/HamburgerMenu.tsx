// src/components/Hamburger/Hamburger.tsx
import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import "./HamburgerMenu.css";
// import type { HamburgerProps } from "../../types/types";

export const HamburgerMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/welcome");
  };

  return (
    <div className="hamburger-container">
      <Hamburger
        toggled={isOpen}
        toggle={setIsOpen}
      />
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
