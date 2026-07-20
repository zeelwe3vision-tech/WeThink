const supabase = require("../../config/supabase");

exports.getRoles = async () => {
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .order("role_name");

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    roles: data,
  };
};

exports.getRoleById = async (id) => {
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      success: false,
      message: "Role not found",
    };
  }

  return {
    success: true,
    role: data,
  };
};

exports.createRole = async (roleData) => {
  const { roleName, description, hierarchyLevel, status } = roleData;

  const { data, error } = await supabase
    .from("roles")
    .insert([
      {
        role_name: roleName,
        description,
        hierarchy_level: hierarchyLevel,
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
    message: "Role created successfully",
    role: data[0],
  };
};

exports.updateRole = async (id, roleData) => {
  const { roleName, description, hierarchyLevel, status } = roleData;

  const { data, error } = await supabase
    .from("roles")
    .update({
      role_name: roleName,
      description,
      hierarchy_level: hierarchyLevel,
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
    message: "Role updated successfully",
    role: data[0],
  };
};

exports.deleteRole = async (id) => {
  const { error } = await supabase.from("roles").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Role deleted successfully",
  };
};
