import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { useProfile } from "../../contexts/ProfileContexts";
import { Navigate } from "react-router-dom";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";
import { getName } from "../../services/services";

import "./NavStatus.css";

export const NavStatus: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user) <Navigate to="/validate" />;
  console.log("NavStatus --> ", profile);
  return (
    <div className="nav-div">
      <p className="nav-user">{(profile && getName(profile)) || user?.email}</p>
      {user ? <HamburgerMenu /> : <Navigate to="/validate" />}
    </div>
  );
};
