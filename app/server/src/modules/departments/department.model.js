module.exports = {};
// Deepak - 03/08/2026 - Start

// Supabase Connection

// Ee line valla Supabase database connect avuthundi.
// Ee file lo unna anni database operations ki idhe use avuthundi.

import supabase from "../../config/supabase.js";

// Table Name
// Prathi query lo "departments" ani malli malli rayakunda
// okasari variable lo store chesamu.

const TABLE_NAME = "departments_new"; // changes this line department to department_new//29-07-26 - dev

// Get All Departments
// Use:
// Department List page open ayinappudu
// Frontend -> GET /api/departments

const getAllDepartments = async () => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_on", { ascending: false });
};

// Get Department By ID

// Use:
// View button click chesinappudu
// Department Details Drawer open cheyyadaniki

const getDepartmentById = async (id) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();
};

// Get Department By Name

// Use:
// New Department create chestunnappudu
// Same Department Name already undha leda check cheyyadaniki

const getDepartmentByName = async (departmentName) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("department_name", departmentName)
    .maybeSingle();
};

// Get Department By Code

// Use:
// Department Code duplicate kakunda check cheyyadaniki

const getDepartmentByCode = async (departmentCode) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("department_code", departmentCode)
    .maybeSingle();
};


// Create Department

// Use:
// Add Department button click chesinappudu

const createDepartment = async (departmentData) => {
  return await supabase
    .from(TABLE_NAME)
    .insert([departmentData])
    .select()
    .single();
};


// Update Department
// Use:
// Edit Department save button click chesinappudu

const updateDepartment = async (id, departmentData) => {
  return await supabase
    .from(TABLE_NAME)
    .update(departmentData)
    .eq("id", id)
    .select()
    .single();
};


// Delete Department

// Use:
// Delete popup lo Confirm button click chesinappudu

const deleteDepartment = async (id) => {
  return await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);
};

// Search Departments

// Use:
// Search box lo type chestunnappudu

const searchDepartments = async (search) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .or(
      `department_name.ilike.%${search}%,department_code.ilike.%${search}%,department_head.ilike.%${search}%`
    );
};

// Filter By Status

// Use:
// Status Filter dropdown change chesinappudu

const getDepartmentsByStatus = async (status) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("status", status);
};

// Filter By Category

// Use:
// Category Filter dropdown change chesinappudu

const getDepartmentsByCategory = async (category) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("category", category);
};

// Export Functions
// Ee functions ni department.service.js file lo use chestham.
// Direct ga controller nundi model ni call cheyyam.
// Flow:
// Routes → Controller → Service → Model → Supabase

module.exports = {
  getAllDepartments,
  getDepartmentById,
  getDepartmentByName,
  getDepartmentByCode,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  searchDepartments,
  getDepartmentsByStatus,
  getDepartmentsByCategory,
};

// Deepak - 03/08/2026 - End