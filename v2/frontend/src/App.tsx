import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { OnDeck } from "./pages/OnDeck/OnDeck";
import { SignUp } from "./pages/SignUp/SignUp";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { Profile } from "./pages/Profile/Profile";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/on-deck" /> },
      { path: "on-deck", element: <OnDeck /> },
      { path: "sign-up", element: <SignUp /> },
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
