// ======================================================
// Employee Service
// WeThink Project
// ======================================================

import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// ===============================
// Get All Employees
// ===============================
export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ===============================
// Get Employee By ID
// ===============================
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ===============================
// Register Employee
// ===============================
export const createEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData);
  return response.data;
};

// ===============================
// Update Employee
// ===============================
export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData);

  return response.data;
};

// ===============================
// Delete Employee
// ===============================
export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
