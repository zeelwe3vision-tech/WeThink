import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const ORGANIZATION_API = "http://localhost:5000/api/organizations";
const DEPARTMENT_API = "http://localhost:5000/api/departments";
const ROLE_API = "http://localhost:5000/api/roles";

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

export const getOrganizations = async () => {
  const response = await axios.get(ORGANIZATION_API);
  return response.data;
};

export const getDepartments = async () => {
  const response = await axios.get(DEPARTMENT_API);
  return response.data;
};

export const getRoles = async () => {
  const response = await axios.get(ROLE_API);
  return response.data;
};

export const getManagers = async () => {
  const response = await axios.get("http://localhost:5000/api/users/managers");

  return response.data;
};