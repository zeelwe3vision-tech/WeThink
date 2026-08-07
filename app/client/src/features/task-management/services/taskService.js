import axios from "axios";

/* =========================================================
   API Configuration
========================================================= */

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is not configured");
}

const API = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, "")}/api/tasks`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   Attach JWT Token Automatically
========================================================= */

API.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    // Clean token if wrapped in quotes
    if (token && (token.startsWith('"') || token.startsWith("'"))) {
      token = token.slice(1, -1);
    }

    if (!token) {
      return Promise.reject({
        isAuthError: true,
        message: "Authentication token is missing. Please login again.",
      });
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================================================
   Response Handler
========================================================= */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject({
        isAuthError: true,
        status: 401,
        message:
          error.response?.data?.message ||
          "Your session has expired. Please login again.",
      });
    }

    return Promise.reject(error);
  },
);

/* =========================================================
   Get All Tasks
========================================================= */

export const getTasks = async (params = {}) => {
  const response = await API.get("/", {
    params,
  });

  return response.data;
};

/* =========================================================
   Get Single Task
========================================================= */

export const getTaskById = async (taskId) => {
  const response = await API.get(`/${taskId}`);

  return response.data;
};

/* =========================================================
   Create Task
========================================================= */

export const createTask = async (taskData) => {
  const formData = new FormData();

  Object.keys(taskData).forEach((key) => {
    if (key === "attachments") {
      taskData.attachments?.forEach((file) => {
        formData.append("attachments", file);
      });
    } else if (Array.isArray(taskData[key])) {
      formData.append(key, JSON.stringify(taskData[key]));
    } else if (taskData[key] !== undefined && taskData[key] !== null) {
      formData.append(key, taskData[key]);
    }
  });

  const response = await API.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* =========================================================
   Update Task
========================================================= */

export const updateTask = async (taskId, taskData) => {
  const formData = new FormData();

  Object.keys(taskData).forEach((key) => {
    if (key === "attachments") {
      taskData.attachments?.forEach((file) => {
        formData.append("attachments", file);
      });
    } else if (Array.isArray(taskData[key])) {
      formData.append(key, JSON.stringify(taskData[key]));
    } else if (taskData[key] !== undefined && taskData[key] !== null) {
      formData.append(key, taskData[key]);
    }
  });

  const response = await API.put(`/${taskId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* =========================================================
   Delete Task
========================================================= */

export const deleteTask = async (taskId) => {
  const response = await API.delete(`/${taskId}`);

  return response.data;
};

/* =========================================================
   Change Task Status
========================================================= */

export const updateTaskStatus = async (taskId, status) => {
  const response = await API.patch(`/${taskId}/status`, {
    status,
  });

  return response.data;
};

/* =========================================================
   Complete Task
========================================================= */

export const completeTask = async (taskId) => {
  const response = await API.patch(`/${taskId}/complete`);

  return response.data;
};

/* =========================================================
   Upload Attachments
========================================================= */

export const uploadAttachments = async (taskId, files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("attachments", file);
  });

  const response = await API.post(`/${taskId}/attachments`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* =========================================================
   Remove Attachment
========================================================= */

export const removeAttachment = async (taskId, attachmentId) => {
  const response = await API.delete(`/${taskId}/attachments/${attachmentId}`);

  return response.data;
};

/* =========================================================
   Activity Timeline
========================================================= */

export const getTaskTimeline = async (taskId) => {
  const response = await API.get(`/${taskId}/timeline`);

  return response.data;
};

/* =========================================================
   Dependencies
========================================================= */

export const getDependencies = async (taskId) => {
  const response = await API.get(`/${taskId}/dependencies`);

  return response.data;
};

export default API;
