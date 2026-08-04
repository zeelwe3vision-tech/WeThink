import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Dashboard from "./features/dashboard/pages/Dashboard";
import RequestAccess from "./features/auth/pages/RequestAccess";
import Layout from "./layout/Layout";
import EmployeeInfo from "./features/organization/employees/pages/EmployeeInfo";
import RoleManagement from "./features/organization/roles-permissions/role-management/pages/RoleManagement";
import PermissionManagement from "./features/organization/roles-permissions/rbac-management/pages/PermissionManagement";
import TaskList from "./features/task-management/pages/TaskList";
import TaskDetails from "./features/task-management/pages/TaskDetails";
// Dev Add this line - 03/08/2026
import DepartmentList from "./features/organization/departments/pages/DepartmentList";
// Dev Add this line - 03/08/2026


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/request-access" element={<RequestAccess />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/organization/employees" element={<EmployeeInfo />} />

        <Route path="/organization/roles" element={<RoleManagement />} />

        <Route
          path="/organization/permissions"
          element={<PermissionManagement />}
        />

        <Route path="/organization/roles" element={<RoleManagement />} />

        <Route path="/organization/rbac" element={<PermissionManagement />} />

        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/organization/departments" element={<DepartmentList />} />
      </Route>
    </Routes>
  );
}

export default App;