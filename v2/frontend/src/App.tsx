import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { OnDeck } from "./pages/OnDeck/OnDeck";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/on-deck" /> },
      { path: "on-deck", element: <OnDeck /> },
      { element: <PrivateRoutes />, children: [] },
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
