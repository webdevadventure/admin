import "./assets/App.css";
import router from "./routers/router";
import { RouterProvider } from "react-router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
