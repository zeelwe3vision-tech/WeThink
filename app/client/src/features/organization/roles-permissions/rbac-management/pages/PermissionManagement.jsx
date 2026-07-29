import { useEffect, useState } from "react";
import "./PermissionManagement.css";

import PermissionHeader from "../components/PermissionHeader";
import PermissionMatrixTable from "../components/PermissionMatrixTable";
import permissionMatrixData from "../data/permissionMatrixData";
import RoleSummary from "../components/RoleSummary";
import ResetPermissionPopup from "../modals/ResetPermissionPopup";

import {
  getEmployees,
  resetPermissions,
} from "../services/permissionService";

import toast from "react-hot-toast";
import { ROLES_PERMISSIONS_TOAST } from "../toast/rolesPermissionsToastMessages";

function PermissionManagement() {
  /* ==========================================================
     State
  ========================================================== */

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [permissions, setPermissions] = useState(permissionMatrixData);
  const [loading, setLoading] = useState(true);

  const [resetPopupOpen, setResetPopupOpen] = useState(false);

  /* ==========================================================
     Load Employees
  ========================================================== */

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      setEmployees(response.users || response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ==========================================================
     Load Employee Permissions
  ========================================================== */

 function loadEmployee(employee) {
   setSelectedEmployee(employee);
   setPermissions(permissionMatrixData);
 }

  /* ==========================================================
     Permission Change
  ========================================================== */

  const handlePermissionChange = (moduleIndex, permissionKey, value) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[moduleIndex][permissionKey] = value;
    setPermissions(updatedPermissions);
  };

  /* ==========================================================
     Reset Permission
  ========================================================== */

  const handleResetPermission = async () => {
    try {
      await resetPermissions(selectedEmployee.id);
      toast.success(ROLES_PERMISSIONS_TOAST.PERMISSION_RESET);
      await loadEmployee(selectedEmployee.id);
      setResetPopupOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(ROLES_PERMISSIONS_TOAST.ERROR_UPDATE);
    }
  };

  /* ==========================================================
     Render
  ========================================================== */

  return (
    <div className="permission-page">
      {/* ================= Header ================= */}

      <PermissionHeader
        employees={employees}
        selectedEmployee={selectedEmployee}
        onSelectEmployee={loadEmployee}
        onResetPermission={() => setResetPopupOpen(true)}
      />

      {/* ================= Main Layout ================= */}

      <div className="permission-layout">
        {/* ================= Left Side (75%) ================= */}

        <div className="permission-left">
          <PermissionMatrixTable
            permissions={permissions}
            loading={loading}
            onPermissionChange={handlePermissionChange}
          />
        </div>

        {/* ================= Right Side (25%) ================= */}

        <div className="permission-right">
          <RoleSummary employee={selectedEmployee} />
        </div>
      </div>

      {/* ================= Reset Popup ================= */}

      <ResetPermissionPopup
        open={resetPopupOpen}
        employee={selectedEmployee}
        onClose={() => setResetPopupOpen(false)}
        onConfirm={handleResetPermission}
      />
    </div>
  );
}

export default PermissionManagement;
