const supabase = require("../../config/supabase");
// deepak - 03/08/26 - Start//
// ======================================
// Get All Departments
// Status + Category + Sort Filter
// Employee Count
// ======================================

exports.getDepartments = async (status = "", category = "", sortBy = "") => {
  let query = supabase.from("departments").select("*");

  // Status Filter
  if (status) {
    query = query.eq("status", status === "Active");
  }

  // Category Filter
  if (category) {
    query = query.eq("category", category);
  }

  // Sort
  if (sortBy === "az") {
    query = query.order("department_name", { ascending: true });
  }

  if (sortBy === "za") {
    query = query.order("department_name", { ascending: false });
  }

  if (sortBy === "newest") {
    query = query.order("created_at", { ascending: false });
  }

  if (sortBy === "oldest") {
    query = query.order("created_at", { ascending: true });
  }

  const { data: departments, error } = await query;

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  // ======================================
  // Get Employees
  // ======================================

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("department_id, organization_id");

  if (userError) {
    return {
      success: false,
      message: userError.message,
    };
  }

  // ======================================
  // Employee Count
  // ======================================

  const employeeCountMap = {};

  users.forEach((user) => {
    if (!user.department_id) {
      return;
    }

    const key = `${user.organization_id}_${user.department_id}`;

    employeeCountMap[key] = (employeeCountMap[key] || 0) + 1;
  });
  // ======================================
  // Merge Employee Count
  // ======================================

  const finalDepartments = departments.map((department) => {
    const employeeKey = `${department.organization_id}_${department.id}`;

    return {
      ...department,

      employees: employeeCountMap[employeeKey] || 0,
    };
  });

  return {
    success: true,

    departments: finalDepartments,
  };
};

// ======================================
// Get Department By Id
// ======================================

exports.getDepartmentById = async (id) => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      success: false,
      message: "Department not found",
    };
  }

  return {
    success: true,
    department: data,
  };
};
// ======================================
// Create Department
// ======================================

exports.createDepartment = async (departmentData) => {
  const {
    departmentName,
    departmentCode,
    category,
    departmentHead,
    description,
    organizationId,
    status,
    createdOn,
  } = departmentData;

  const { data, error } = await supabase
    .from("departments")
    .insert([
      {
        department_name: departmentName,
        department_code: departmentCode,
        category,
        department_head: departmentHead,
        description,
        organization_id: organizationId,
        status,
        created_at: createdOn || new Date(),
      },
    ])
    .select();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Department created successfully",
    department: data[0],
  };
};

// ======================================
// Update Department
// ======================================
exports.updateDepartment = async (id, departmentData) => {
  console.log("Received departmentData:", departmentData);
  const {
    departmentName,
    departmentCode,
    category,
    departmentHead,
    description,
    organizationId,
    status,
    createdOn,
  } = departmentData;
  console.log("createdOn:", createdOn);

  const { data, error } = await supabase
    .from("departments")
    .update({
      department_name: departmentName,
      department_code: departmentCode,
      category,
      department_head: departmentHead,
      description,
      organization_id: organizationId,
      status,
      created_at: createdOn,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select();
  console.log("Updated Data:", data);
  console.log("Update Error:", error);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Department updated successfully",
    department: data[0],
  };
};

exports.deleteDepartment = async (id) => {
  console.log("Delete ID:", id);

  // Check if any users are assigned
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("department_id", id);

  if (userError) {
    return {
      success: false,
      message: userError.message,
    };
  }

  console.log("Users:", users);

  if (users.length > 0) {
    return {
      success: false,
      message:
        "Cannot delete department. Employees are assigned to this department.",
    };
  }

  // Delete department
  const { error } = await supabase.from("departments").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Department deleted successfully",
  };
};

// ======================================
// Search Departments
// ======================================

exports.searchDepartments = async (search) => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .or(
      `department_name.ilike.*${search}*,department_code.ilike.*${search}*,category.ilike.*${search}*,description.ilike.*${search}*`,
    );

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    departments: data,
  };
};

// ======================================
// Get Departments By Status
// ======================================

exports.getDepartmentsByStatus = async (status) => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("status", status === "Active");

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    departments: data,
  };
};

// ======================================
// Get Departments By Category
// ======================================

exports.getDepartmentsByCategory = async (category) => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("category", category);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    departments: data,
  };
};

// ======================================
// Check Department Name
// ======================================

exports.checkDepartmentName = async (departmentName) => {
  const { data, error } = await supabase
    .from("departments")
    .select("id")
    .eq("department_name", departmentName)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    exists: !!data,
  };
};

// ======================================
// Check Department Code
// ======================================

exports.checkDepartmentCode = async (departmentCode) => {
  const { data, error } = await supabase
    .from("departments")
    .select("id")
    .eq("department_code", departmentCode)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    exists: !!data,
  };
};
//deepak - 03/08/2026 - End//
