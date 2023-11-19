import { Navigate, RouteObject } from "react-router-dom";

import Authentication from "./pages/Authentication";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const authenticationRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "*",
        element: <Navigate to="sign-in" />,
      },
      {
        path: "",
        element: <Navigate to="sign-in" />,
      },
    ],
  },
];

export default authenticationRoutes;
