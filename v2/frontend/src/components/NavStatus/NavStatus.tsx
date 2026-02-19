import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { Navigate } from "react-router-dom";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";
// import { loadProfile } from "../Profile/profile";
import type { Profile } from "../../interface/types";
import "./NavStatus.css";

export const NavStatus: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  console.log("Nav-status", user);
  // const profile = user?.identities?.[0]?.identity_data || null;
  console.log("profile", profile);

  if (!user) <Navigate to="/welcome" />;

  return (
    <div className="nav-div">
      <p className="nav-user">{user ? user?.email : ""}</p>
      {user ? <HamburgerMenu /> : <Navigate to="/welcome" />}
    </div>
  );
};
