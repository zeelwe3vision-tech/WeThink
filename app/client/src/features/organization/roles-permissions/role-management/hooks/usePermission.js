import { useEffect, useMemo, useState } from "react";
import {
  getPermissions,
  getPermissionMatrix,
  savePermissionMatrix,
  getUserPermissions,
  updateUserPermissions,
  resetUserPermissions,
} from "../services/permissionService";

export default function usePermissions() {
  /* ==========================================================
     State
  ========================================================== */

  const [permissions, setPermissions] = useState([]);

  const [matrix, setMatrix] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  /* ==========================================================
     Fetch Permission Matrix
  ========================================================== */

  async function fetchPermissionMatrix() {
    try {
      setLoading(true);

      setError(null);

      const response = await getPermissionMatrix();

      setMatrix(response.matrix || []);
    } catch (err) {
      console.log(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================================
     Fetch Permission List
  ========================================================== */

  async function fetchPermissions() {
    try {
      const response = await getPermissions();

      setPermissions(response.permissions || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPermissionMatrix();

    fetchPermissions();
  }, []);

  /* ==========================================================
     Filter Modules
  ========================================================== */

  const filteredMatrix = useMemo(() => {
    if (!search) {
      return matrix;
    }

    return matrix.filter((item) =>
      item.module?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [matrix, search]);

  /* ==========================================================
     Load User Permissions
  ========================================================== */

  const loadUserPermissions = async (userId) => {
    try {
      const response = await getUserPermissions(userId);

      setSelectedUser(response.user || null);

      return response.permissions || [];
    } catch (err) {
      console.log(err);

      return [];
    }
  };

  /* ==========================================================
     Save User Permissions
  ========================================================== */

  const saveUserPermissions = async (userId, permissionData) => {
    try {
      setSaving(true);

      await updateUserPermissions(userId, permissionData);

      return true;
    } catch (err) {
      console.log(err);

      return false;
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================================
     Save Matrix
  ========================================================== */

  const saveMatrix = async (matrixData) => {
    try {
      setSaving(true);

      await savePermissionMatrix(matrixData);

      await fetchPermissionMatrix();

      return true;
    } catch (err) {
      console.log(err);

      return false;
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================================
     Reset User Permissions
  ========================================================== */

  const restorePermissions = async (userId) => {
    try {
      await resetUserPermissions(userId);

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  /* ==========================================================
     Return
  ========================================================== */

  return {
    permissions,
    matrix,
    filteredMatrix,
    selectedUser,
    loading,
    saving,
    error,
    search,
    setSearch,
    fetchPermissions,
    fetchPermissionMatrix,
    loadUserPermissions,
    saveUserPermissions,
    saveMatrix,
    restorePermissions,
  };
}
