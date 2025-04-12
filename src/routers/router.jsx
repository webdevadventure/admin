import { createBrowserRouter } from "react-router";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
import MainLayout from "../layouts/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
