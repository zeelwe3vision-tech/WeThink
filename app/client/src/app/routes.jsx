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
  // department route dev 03-08-2026//
  {
    path:"organization/department",
    element: <Department/>
  }
]);

export default router;
