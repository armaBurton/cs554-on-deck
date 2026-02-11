// src/components/Layout/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavStatus } from "../NavStatus/NavStatus";
import "./Layout.css";

export const Layout = () => {
  return (
    <>
      <section className="nav layout-section">
        <NavStatus />
      </section>
      <section className="main layout-section">
        <Outlet />
      </section>
    </>
  );
};
