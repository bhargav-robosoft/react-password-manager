import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";

const sitesRoutes: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
  },
];

export default sitesRoutes;