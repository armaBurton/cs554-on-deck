import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

// gcloud OAuth
// https://console.cloud.google.com/auth/clients/909582034483-4tohqc81lm45sv3g3fd2u0njvps8d5c8.apps.googleusercontent.com?project=cloud-burton-arma
