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
  const { roleName, roleCode, description, hierarchy, hierarchyLevel, status } =
    roleData;

  const { data, error } = await supabase
    .from("roles")
    .insert([
      {
        role_name: roleName,
        role_code: roleCode,
        description,
        hierarchy_level: Number(hierarchyLevel || hierarchy),
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
  try {
    console.log("=================================");
    console.log("UPDATE ROLE");
    console.log("ID:", id);
    console.log("BODY:", roleData);

    const {
      roleName,
      roleCode,
      description,
      hierarchy,
      hierarchyLevel,
      status,
    } = roleData;

    console.log("Hierarchy:", hierarchy);
    console.log("Hierarchy Level:", hierarchyLevel);

    const { data, error } = await supabase
      .from("roles")
      .update({
        role_name: roleName,
        role_code: roleCode,
        description,
        hierarchy_level: Number(hierarchyLevel || hierarchy),
        status,
        updated_at: new Date(),
      })
      .eq("id", id)
      .select();

    console.log("Supabase Data:", data);
    console.log("Supabase Error:", error);

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
  } catch (err) {
    console.error("UPDATE ERROR:", err);

    return {
      success: false,
      message: err.message,
    };
  }
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

exports.cloneRole = async (id, roleData) => {
  const { roleName, roleCode, description, hierarchy, hierarchyLevel, status } =
    roleData;

  // Get source role
  const { data: sourceRole, error: fetchError } = await supabase
    .from("roles")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    return {
      success: false,
      message: "Source role not found",
    };
  }

  // Insert cloned role
  const { data, error } = await supabase
    .from("roles")
    .insert([
      {
        role_name: roleName,
        role_code: roleCode,
        description: description || sourceRole.description,
        hierarchy_level: Number(hierarchyLevel || hierarchy),
        status: status !== undefined ? status : sourceRole.status,
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
    message: "Role cloned successfully",
    role: data[0],
  };
};
