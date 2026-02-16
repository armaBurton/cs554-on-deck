import {
  // RouterProvider,
  // Navigate,
  // createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Welcome } from "./pages/Modal/Welcome/Welcome";
import { Register } from "./pages/Modal/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Profile } from "./pages/Profile/Profile";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/register" element={<Register />} />
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
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Navigate to="/welcome" /> },
//       { path: "welcome", element: <Welcome /> },
//       { path: "register", element: <Register /> },
//       {
//         element: <PrivateRoutes children={undefined} />,
//         children: [
//           { path: "on-deck", element: <OnDeck /> },
//           { path: "profile", element: <Profile /> },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />;
//     </>
//   );
// }

export default App;
