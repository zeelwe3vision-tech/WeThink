// Chetan - 11/06/2024 - start
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Dashboard from "./features/dashboard/pages/Dashboard";
import RequestAccess from "./features/auth/pages/RequestAccess";
import Layout from "./layout/Layout";
import EmployeeInfo from "./features/organization/employees/pages/EmployeeInfo";
 // dev-22.07.26-start
import Department from "./features/organization/departments/pages/Department";
// dev-22.07.26-end
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/request-access" element={<RequestAccess />} />
      {/* Protected Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/organization/employees" element={<EmployeeInfo />} />
        {/* dev-22.07.26-start  */}
        <Route
          path="/organization/departments"
          element={<Department />}
        />
       {/* dev-22.07.26-end */}
      </Route>
    </Routes>
  );
}

export default App;
// Chetan - 11/06/2024 - end
