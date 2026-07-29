// Chetan - Permission Management Page

import { useEffect, useMemo, useState } from "react";
import "./PermissionManagement.css";

import PermissionHeader from "../components/PermissionHeader";
import PermissionToolbar from "../components/PermissionToolbar";
import ModuleList from "../components/ModuleList";
import PermissionMatrix from "../components/PermissionMatrix";

import UserPermissionDrawer from "../drawers/UserPermissionDrawer";

import { getEmployees } from "../../employees/services/employeeService";

function PermissionManagement() {
  /* ==========================================================
     State
  ========================================================== */

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("all");

  const [roleFilter, setRoleFilter] = useState("all");

  const [showDrawer, setShowDrawer] = useState(false);

  /* ==========================================================
     Fetch Employees
  ========================================================== */

  async function fetchEmployees() {
    try {
      setLoading(true);

      const response = await getEmployees();

      setEmployees(response.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ==========================================================
     Filter Employees
  ========================================================== */

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchMatch =
        employee.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        employee.employee_id?.toLowerCase().includes(search.toLowerCase());

      const departmentMatch =
        departmentFilter === "all"
          ? true
          : employee.department === departmentFilter;

      const roleMatch =
        roleFilter === "all" ? true : employee.role === roleFilter;

      return searchMatch && departmentMatch && roleMatch;
    });
  }, [employees, search, departmentFilter, roleFilter]);

  /* ==========================================================
     Handlers
  ========================================================== */

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleManagePermission = (employee) => {
    setSelectedEmployee(employee);

    setShowDrawer(true);
  };

  const handleResetFilters = () => {
    setSearch("");

    setDepartmentFilter("all");

    setRoleFilter("all");
  };

  return (
    <div className="permission-management-page">
      {/* ======================================================
          Header
      ====================================================== */}

      <PermissionHeader totalUsers={employees.length} />

      {/* ======================================================
          Toolbar
      ====================================================== */}

      <PermissionToolbar
        search={search}
        setSearch={setSearch}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        onReset={handleResetFilters}
      />

      {/* ======================================================
          Module Layout
      ====================================================== */}

      <div className="permission-layout">
        <ModuleList
          loading={loading}
          employees={filteredEmployees}
          selectedEmployee={selectedEmployee}
          onSelect={handleSelectEmployee}
        />

        <PermissionMatrix
          employee={selectedEmployee}
          onManage={handleManagePermission}
        />
      </div>

      {/* ======================================================
          Drawer
      ====================================================== */}

      <UserPermissionDrawer
        open={showDrawer}
        employee={selectedEmployee}
        onClose={() => setShowDrawer(false)}
      />
    </div>
  );
}

export default PermissionManagement;
