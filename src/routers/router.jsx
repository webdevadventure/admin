import { createBrowserRouter } from "react-router";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    //element: <UserLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
