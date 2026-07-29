import { useEffect, useMemo, useState } from "react";
import "./RoleManagement.css";

import RoleHeader from "../components/RoleHeader";
import RoleFilters from "../components/RoleFilters";
import RoleTable from "../components/RoleTable";

import CreateRoleModal from "../modals/CreateRoleModal";
import CloneRoleModal from "../modals/CloneRoleModal";
import AssignRoleModal from "../modals/AssignRoleModal";

import RoleDetailsDrawer from "../drawers/RoleDetailsDrawer";

import EditRoleModal from "../modals/EditRoleModal";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  cloneRole,
} from "../services/roleService";

import toast from "react-hot-toast";
import { ROLES_PERMISSIONS_TOAST } from "../../rbac-management/toast/rolesPermissionsToastMessages";

function RoleManagement() {
  /* ==========================================================
     State
  ========================================================== */

  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [hierarchyFilter, setHierarchyFilter] = useState("");

  const [selectedRole, setSelectedRole] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  /* ==========================================================
     Modal State
  ========================================================== */

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showCloneModal, setShowCloneModal] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);

  /* ==========================================================
     Load Roles
  ========================================================== */

  async function fetchRoles() {
    try {
      setLoading(true);

      const response = await getRoles();

      setRoles(response.roles || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchRoles();
    };

    loadData();
  }, []);

  /* ==========================================================
     Filter Roles
  ========================================================== */

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const searchMatch =
        role.role_name.toLowerCase().includes(search.toLowerCase()) ||
        role.role_code.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "" ? true : String(role.status) === statusFilter;

      const hierarchyMatch =
        hierarchyFilter === ""
          ? true
          : String(role.hierarchy_level) === hierarchyFilter;

      return searchMatch && statusMatch && hierarchyMatch;
    });
  }, [roles, search, statusFilter, hierarchyFilter]);

  /* ==========================================================
     Handlers
  ========================================================== */

  const handleCreateRole = async (data) => {
    console.log("Submitting Role:", data);

    try {
      const response = await createRole(data);

      console.log("API Response:", response);

      await fetchRoles();

      setShowCreateModal(false);
      
    } catch (error) {
      console.error("Create Role Error:", error.response?.data || error);
    }
  };

  const handleCloneSubmit = async (data) => {
    try {
      await cloneRole(selectedRole.id, {
        roleName: data.role_name,
        roleCode: data.role_code,
        description: selectedRole.description,
        hierarchy: data.hierarchy_level,
        status: selectedRole.status,
        copyPermissions: data.copy_permissions,
      });

      toast.success(ROLES_PERMISSIONS_TOAST.ROLE_CLONED);

      await fetchRoles();

      setShowCloneModal(false);
      setSelectedRole(null);
    } catch (error) {
      console.error(error);

      toast.error(ROLES_PERMISSIONS_TOAST.ERROR_CREATE);
    }
  };
  
  const handleUpdateRole = (role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const handleSaveRole = async (updatedRole) => {
    try {
      await updateRole(selectedRole.id, updatedRole);

      toast.success(ROLES_PERMISSIONS_TOAST.ROLE_UPDATED);

      await fetchRoles();

      setShowEditModal(false);

      setSelectedRole(null);
    } catch (error) {
      console.error(error);

      toast.error(ROLES_PERMISSIONS_TOAST.ERROR_UPDATE);
    }
  };
  
  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);

      toast.success(ROLES_PERMISSIONS_TOAST.ROLE_DELETED);

      await fetchRoles();
    } catch (error) {
      console.error(error);

      toast.error(ROLES_PERMISSIONS_TOAST.ERROR_DELETE);
    }
  };
  
  const handleViewRole = (role) => {
    setSelectedRole(role);

    setShowDetailsDrawer(true);
  };

  const handleCloneRole = (role) => {
    setSelectedRole(role);

    setShowCloneModal(true);
  };

  const handleAssignRole = (role) => {
    setSelectedRole(role);

    setShowAssignModal(true);
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("");
    setHierarchyFilter("");
  };

  return (
    <div className="role-management-page">
      {/* ======================================================
          Header
      ====================================================== */}

      <RoleHeader onCreateRole={() => setShowCreateModal(true)} />

      {/* ======================================================
          Filters
      ====================================================== */}

      <RoleFilters
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatusFilter}
        hierarchy={hierarchyFilter}
        setHierarchy={setHierarchyFilter}
        onReset={handleReset}
      />

      {/* ======================================================
          Role Table
      ====================================================== */}

      <RoleTable
        loading={loading}
        roles={filteredRoles}
        onView={handleViewRole}
        onEdit={handleUpdateRole}
        onDelete={handleDeleteRole}
        onClone={handleCloneRole}
        onAssign={handleAssignRole}
      />

      {/* ======================================================
          Empty State
      ====================================================== */}

      {!loading && filteredRoles.length === 0 && (
        <div className="role-empty-state">
          <h3>No Roles Found</h3>

          <p>Try changing your search or filter criteria.</p>
        </div>
      )}

      {/* ======================================================
          Create Role
      ====================================================== */}

      <CreateRoleModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateRole}
      />

      <EditRoleModal
        open={showEditModal}
        role={selectedRole}
        onClose={() => {
          setShowEditModal(false);
          setSelectedRole(null);
        }}
        onSave={handleSaveRole}
      />

      {/* ======================================================
          Clone Role
      ====================================================== */}

      <CloneRoleModal
        open={showCloneModal}
        role={selectedRole}
        onClose={() => {
          setShowCloneModal(false);
          setSelectedRole(null);
        }}
        onClone={handleCloneSubmit}
      />

      {/* ======================================================
          Assign Role
      ====================================================== */}

      <AssignRoleModal
        open={showAssignModal}
        role={selectedRole}
        onClose={() => setShowAssignModal(false)}
        onSubmit={() => {
          setShowAssignModal(false);
        }}
      />

      {/* ======================================================
          Role Details Drawer
      ====================================================== */}

      <RoleDetailsDrawer
        open={showDetailsDrawer}
        role={selectedRole}
        onClose={() => setShowDetailsDrawer(false)}
      />
    </div>
  );
}

export default RoleManagement;