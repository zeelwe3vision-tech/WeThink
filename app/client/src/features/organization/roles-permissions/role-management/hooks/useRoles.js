import { useEffect, useMemo, useState } from "react";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../services/roleService";

export default function useRoles() {
  /* ==========================================================
     State
  ========================================================== */

  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  /* ==========================================================
     Fetch Roles
  ========================================================== */

  async function fetchRoles() {
    try {
      setLoading(true);

      setError(null);

      const response = await getRoles();

      setRoles(response.roles || []);
    } catch (err) {
      console.log(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  /* ==========================================================
     Filter Roles
  ========================================================== */

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const searchMatch =
        role.role_name?.toLowerCase().includes(search.toLowerCase()) ||
        role.role_code?.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "all" ? true : String(role.status) === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [roles, search, statusFilter]);

  /* ==========================================================
     Create Role
  ========================================================== */

  const addRole = async (roleData) => {
    try {
      await createRole(roleData);
      await fetchRoles();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /* ==========================================================
     Update Role
  ========================================================== */

  const editRole = async (id, roleData) => {
    try {
      await updateRole(id, roleData);
      await fetchRoles();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /* ==========================================================
     Delete Role
  ========================================================== */

  const removeRole = async (id) => {
    try {
      await deleteRole(id);
      await fetchRoles();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /* ==========================================================
     Reset Filters
  ========================================================== */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  /* ==========================================================
     Return
  ========================================================== */

  return {
    roles,
    filteredRoles,
    loading,
    error,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    fetchRoles,
    addRole,
    editRole,
    removeRole,
    resetFilters,
  };
}
