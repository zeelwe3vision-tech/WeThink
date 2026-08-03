import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import RequestAccess from "../pages/RequestAccess";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/request-access",
    element: <RequestAccess />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
