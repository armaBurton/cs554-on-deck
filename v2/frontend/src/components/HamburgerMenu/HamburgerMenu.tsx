// src/components/Hamburger/Hamburger.tsx
import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import "./HamburgerMenu.css";

export const HamburgerMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  if (!user) navigate("/validate");

  const handleSignOut = async () => {
    await signOut();
    navigate("/validate");
    setIsOpen(false);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsOpen(false);
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
            <a
              href="#"
              onClick={handleDashboard}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleProfile}
            >
              Profile
            </a>
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
