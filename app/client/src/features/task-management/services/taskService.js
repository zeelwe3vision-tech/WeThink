import axios from "axios";
/*
=========================================================
 Task Service
 Module : Task Management
=========================================================
*/
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks",

  headers: {
    "Content-Type": "application/json",
  },
});

/*
=========================================================
 Attach JWT Token Automatically
=========================================================
*/
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/*
=========================================================
 Response Handler
=========================================================
*/
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized Access");
    }

    return Promise.reject(error);
  },
);

/*
=========================================================
 Get All Tasks
=========================================================
*/

export const getTasks = async (params = {}) => {
  const response = await API.get("/", {
    params,
  });
  return response.data;
};

/*
=========================================================
 Get Single Task
=========================================================
*/
export const getTaskById = async (taskId) => {
  const response = await API.get(`/${taskId}`);
  return response.data;
};

/*
=========================================================
 Create Task
=========================================================
*/
export const createTask = async (taskData) => {
  const formData = new FormData();

  Object.keys(taskData).forEach((key) => {
    if (key === "attachments") {
      taskData.attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    } else if (Array.isArray(taskData[key])) {
      formData.append(key, JSON.stringify(taskData[key]));
    } else {
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

/*
=========================================================
 Update Task
=========================================================
*/
export const updateTask = async (taskId, taskData) => {
  const formData = new FormData();

  Object.keys(taskData).forEach((key) => {
    if (key === "attachments") {
      taskData.attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    } else if (Array.isArray(taskData[key])) {
      formData.append(key, JSON.stringify(taskData[key]));
    } else {
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

/*
=========================================================
 Delete Task
=========================================================
*/
export const deleteTask = async (taskId) => {
  const response = await API.delete(`/${taskId}`);
  return response.data;
};

/*
=========================================================
 Change Task Status
=========================================================
*/
export const updateTaskStatus = async (taskId, status) => {
  const response = await API.patch(`/${taskId}/status`, {
    status,
  });
  return response.data;
};

/*
=========================================================
 Complete Task
=========================================================
*/
export const completeTask = async (taskId) => {
  const response = await API.patch(`/${taskId}/complete`);

  return response.data;
};

/*
=========================================================
 Upload Attachments
=========================================================
*/

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

/*
=========================================================
 Remove Attachment
=========================================================
*/
export const removeAttachment = async (taskId, attachmentId) => {
  const response = await API.delete(`/${taskId}/attachments/${attachmentId}`);
  return response.data;
};

/*
=========================================================
 Activity Timeline
=========================================================
*/

export const getTaskTimeline = async (taskId) => {
  const response = await API.get(`/${taskId}/timeline`);
  return response.data;
};

/*
=========================================================
 Dependencies
=========================================================
*/

export const getDependencies = async (taskId) => {
  const response = await API.get(`/${taskId}/dependencies`);
  return response.data;
};
export default API;
