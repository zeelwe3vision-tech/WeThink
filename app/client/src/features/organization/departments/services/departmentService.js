// Deepak - 28/07/2026 - Start

const BASE_URL = "http://localhost:5000/api/departments";

// ======================================
// Get All Departments
// ======================================
export const getDepartments = async (
  status = "",
  category = "",
  sortBy = ""
) => {

  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (category) {
    params.append("category", category);
  }

  if (sortBy) {
    params.append("sortBy", sortBy);
  }

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`
  );

  const result = await response.json();

  if (!result.success) {
    return result;
  }

  result.departments = result.departments.map((department) => ({
    id: department.id,
    departmentName: department.department_name,
    departmentCode: department.department_code,
    category: department.category,
    head: department.department_head,
    employees: department.employee_count,
    status: department.status,
    createdOn: department.created_at,
  }));

  return result;

};

// ======================================
// Get Department By Id
// ======================================

export const getDepartmentById = async (id) => {

  const response = await fetch(`${BASE_URL}/${id}`);

  return await response.json();

};
export const searchDepartments = async (search) => {

  const response = await fetch(
  `${BASE_URL}/search/${search}`
);

  const result = await response.json();

  if (!result.success) {
    return result;
  }

  result.departments = result.departments.map((department) => ({
    id: department.id,
    departmentName: department.department_name,
    departmentCode: department.department_code,
    category: department.category,
    head: department.department_head,
    employees: department.employee_count,
    status: department.status,
    createdOn: department.created_at,
  }));

  return result;

};

// ======================================
// Create Department
// ======================================

export const createDepartment = async (departmentData) => {

  const response = await fetch(BASE_URL, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(departmentData),

  });

  return await response.json();

};

// ======================================
// Update Department
// ======================================

export const updateDepartment = async (id, departmentData) => {

  const response = await fetch(`${BASE_URL}/${id}`, {

    method: "PUT",

    headers: {

      "Content-Type": "application/json",
    },

    body: JSON.stringify(departmentData),

  });

  return await response.json();

};

// ======================================
// Delete Department
// ======================================

export const deleteDepartment = async (id) => {

  const response = await fetch(`${BASE_URL}/${id}`, {

    method: "DELETE",

  });

  return await response.json();

};
// Deepak - 28/07/2026 - End