import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Welcome } from "./pages/Modal/Welcome/Welcome";
import { Register } from "./pages/Modal/Register/Register";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { Profile } from "./pages/Profile/Profile";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/welcome" /> },
      { path: "welcome", element: <Welcome /> },
      { path: "register", element: <Register /> },
      {
        element: <PrivateRoutes children={undefined} />,
        children: [{ path: "profile", element: <Profile /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
