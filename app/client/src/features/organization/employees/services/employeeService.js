import axios from "axios";

/* ==========================================================
   LOCAL DEVELOPMENT
========================================================== */
const API_URL = `http://localhost:5000/api/users`;

const ORGANIZATION_API = `http://localhost:5000/api/organizations`;

const DEPARTMENT_API = `http://localhost:5000/api/departments`;

const ROLE_API = `http://localhost:5000/api/roles`;

/* ==========================================================
   PRODUCTION (UNCOMMENT AFTER DEPLOYMENT)
========================================================== */

// const API = import.meta.env.VITE_API_URL;

// const API_URL = `${API}/users`;

// const ORGANIZATION_API = `${API}/organizations`;

// const DEPARTMENT_API = `${API}/departments`;

// const ROLE_API = `${API}/roles`;

/* ==========================================================
   Employees
========================================================== */

export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

/* ==========================================================
   Organization
========================================================== */

export const getOrganizations = async () => {
  const response = await axios.get(ORGANIZATION_API);
  return response.data;
};

/* ==========================================================
   Department
========================================================== */

export const getDepartments = async () => {
  const response = await axios.get(DEPARTMENT_API);
  return response.data;
};

/* ==========================================================
   Roles
========================================================== */

export const getRoles = async () => {
  const response = await axios.get(ROLE_API);
  return response.data;
};

/* ==========================================================
   Managers
========================================================== */

export const getManagers = async () => {
  const response = await axios.get(`${API_URL}/managers`);
  return response.data;
};
