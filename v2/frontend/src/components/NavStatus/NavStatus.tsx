import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { Navigate, useNavigate } from "react-router-dom";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";
import "./NavStatus.css";

export const NavStatus: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // const handleSignOut = async () => {
  //   await signOut();
  //   navigate("/welcome");
  // };

  return (
    <div className="nav-div">
      <p className="nav-user">{user?.email}</p>
      {user ? <HamburgerMenu /> : <Navigate to="/welcome" />}
    </div>
  );
};
