import {
  // RouterProvider,
  // Navigate,
  // createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContexts.tsx";
import { ProfileProvider } from "./contexts/ProfileContexts.tsx";

import { Register } from "./pages/Modal/Register/Register";
import { Validate } from "./pages/Modal/Validate/Validate";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Profile } from "./pages/Profile/Profile";
import { NavStatus } from "./components/NavStatus/NavStatus.tsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/validate"
              element={<Validate />}
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={<PrivateRoute>{/* <NavStatus /> */}</PrivateRoute>}
            />
            <Route
              path="/"
              element={<Validate />}
            />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
