import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { useProfile } from "../../contexts/ProfileContexts";
import { Navigate } from "react-router-dom";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";

import "./NavStatus.css";

const getName = ({ first_name, last_name, stage_name, email }) => {
  // first_name === "" && last_name === "" && stage_name === null ?

  return null;
};

export const NavStatus: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user) <Navigate to="/validate" />;
  console.log(profile);
  return (
    <div className="nav-div">
      <p className="nav-user">{(profile && getName(profile)) || user?.email}</p>
      {user ? <HamburgerMenu /> : <Navigate to="/validate" />}
    </div>
  );
};
