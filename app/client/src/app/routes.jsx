import { createBrowserRouter } from "react-router-dom";

//import Login from "../pages/Login";// comment this and below add one line// dev-22.07.26//
import Login from "../features/auth/pages/Login";

//import RequestAccess from "../pages/RequestAccess";// // comment this and below add one line// dev-22.07.26//
import RequestAccess from "../features/auth/pages/RequestAccess";
//import Dashboard from "../pages/Dashboard";// comment this and below add one line// dev-22.07.26//
import Dashboard from "../features/dashboard/pages/Dashboard";
// added this line dev //22.07.26
import Department from "../features/organization/departments/pages/Department"; 
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
  //add this line dev//22.07.26
  {
  path: "/organization/departments",
  element: <Department />,
}
  
]);

export default router;
