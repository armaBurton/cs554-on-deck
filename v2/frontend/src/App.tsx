import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ element: <PrivateRoutes />, children: [] }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
