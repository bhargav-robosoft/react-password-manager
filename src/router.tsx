import { Navigate, createBrowserRouter } from "react-router-dom";
import authenticationRoutes from "./features/authentication/authentication-routes";
import sitesRoutes from "./features/sites/sites-routes";

const router = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/home" />,
  },
  ...authenticationRoutes,
  ...sitesRoutes,
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
]);

export default router;
