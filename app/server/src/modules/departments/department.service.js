const supabase = require("../../config/supabase");

exports.getDepartments = async () => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("department_name");

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

exports.createDepartment = async (departmentData) => {
  const {
    departmentName,
    departmentCode,
    description,
    organizationId,
    status,
  } = departmentData;

  const { data, error } = await supabase
    .from("departments")
    .insert([
      {
        department_name: departmentName,
        department_code: departmentCode,
        description,
        organization_id: organizationId,
        status,
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

exports.updateDepartment = async (id, departmentData) => {
  const {
    departmentName,
    departmentCode,
    description,
    organizationId,
    status,
  } = departmentData;

  const { data, error } = await supabase
    .from("departments")
    .update({
      department_name: departmentName,
      department_code: departmentCode,
      description,
      organization_id: organizationId,
      status,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select();

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
