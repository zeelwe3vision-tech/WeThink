import { useState, useEffect, useCallback } from "react";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  completeTask,
  uploadAttachments,
  removeAttachment,
  getTaskTimeline,
  getDependencies,
} from "../services/taskService";

export default function useTasks() {
  /* =====================================================
     STATES
  ===================================================== */

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [timeline, setTimeline] = useState([]);
  const [dependencies, setDependencies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);

  /* =====================================================
     GET ALL TASKS
  ===================================================== */

  const fetchTasks = useCallback(async (params = {}) => {
    try {
      setLoading(true);

      const response = await getTasks(params);

      setTasks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =====================================================
     GET SINGLE TASK
  ===================================================== */

  const fetchTaskDetails = useCallback(async (taskId) => {
    try {
      setLoading(true);

      const response = await getTaskById(taskId);

      setSelectedTask(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =====================================================
     CREATE TASK
  ===================================================== */

  const addTask = async (taskData) => {
    try {
      setSubmitting(true);

      const response = await createTask(taskData);

      await fetchTasks();

      return response;
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     UPDATE TASK
  ===================================================== */

  const editTask = async (taskId, taskData) => {
    try {
      setSubmitting(true);

      const response = await updateTask(taskId, taskData);

      await fetchTasks();

      return response;
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     DELETE TASK
  ===================================================== */

  const removeTask = async (taskId) => {
    await deleteTask(taskId);

    await fetchTasks();
  };

  /* =====================================================
     CHANGE STATUS
  ===================================================== */

  const changeStatus = async (taskId, status) => {
    await updateTaskStatus(taskId, status);

    await fetchTasks();
  };

  /* =====================================================
     COMPLETE TASK
  ===================================================== */

  const markCompleted = async (taskId) => {
    await completeTask(taskId);

    await fetchTasks();
  };

  /* =====================================================
     ATTACHMENTS
  ===================================================== */

  const uploadFiles = async (taskId, files) => {
    return await uploadAttachments(taskId, files);
  };

  const deleteAttachment = async (taskId, attachmentId) => {
    return await removeAttachment(taskId, attachmentId);
  };

  /* =====================================================
     TIMELINE
  ===================================================== */

  const fetchTimeline = async (taskId) => {
    const response = await getTaskTimeline(taskId);

    setTimeline(response.data || []);
  };

  /* =====================================================
     DEPENDENCIES
  ===================================================== */

  const fetchDependencies = async (taskId) => {
    const response = await getDependencies(taskId);

    setDependencies(response.data || []);
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    /* states */

    tasks,
    selectedTask,
    timeline,
    dependencies,

    loading,
    submitting,
    error,

    /* methods */

    fetchTasks,
    fetchTaskDetails,

    addTask,
    editTask,
    removeTask,

    changeStatus,
    markCompleted,

    uploadFiles,
    deleteAttachment,

    fetchTimeline,
    fetchDependencies,

    setSelectedTask,
  };
}
