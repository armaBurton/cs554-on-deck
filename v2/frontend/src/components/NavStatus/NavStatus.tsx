import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { Navigate } from "react-router-dom";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";

import "./NavStatus.css";

export const NavStatus: React.FC = () => {
  const { user } = useAuth();

  if (!user) <Navigate to="/validate" />;

  return (
    <div className="nav-div">
      <p className="nav-user">{user ? user?.email : ""}</p>
      {user ? <HamburgerMenu /> : <Navigate to="/validate" />}
    </div>
  );
};
