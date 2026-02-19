import {
  // RouterProvider,
  // Navigate,
  // createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContexts.tsx";

import { Welcome } from "./pages/Modal/Welcome/Welcome";
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
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/welcome"
            element={<Welcome />}
          ></Route> */}
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
                <NavStatus />
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <NavStatus />
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={<Validate />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
