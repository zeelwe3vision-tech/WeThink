const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");

const createLookupMap = (data, keyField = "id") => {
  const map = new Map();

  data.forEach((item) => {
    map.set(item[keyField], item);
  });

  return map;
};

exports.createUser = async (userData) => {
  //deepak - 03/08/2026 - Start//
  console.log("Received Payload:", userData);
  console.log("Department ID:", userData.departmentId);
  //deepak - 03/08/2026 - End//
  const {
    employeeId,
    firstName,
    lastName,
    email,
    mobile,
    password,
    organizationId,
    departmentId,
    roleId,
    managerId,
    designation,
    joiningDate,
    employmentType,
    status,
  } = userData;

  /* ----------------------------------------
     Check Existing User
  ---------------------------------------- */

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .or(`email.eq.${email},employee_id.eq.${employeeId}`)
    .maybeSingle();

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  /* ----------------------------------------
   First User Check
---------------------------------------- */

  const { count, error: countError } = await supabase
    .from("users")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (countError) {
    return {
      success: false,
      message: countError.message,
    };
  }

  /* ----------------------------------------
   First User becomes CEO
---------------------------------------- */

  let finalRoleId = roleId;
  let finalManagerId = managerId;

  if (count === 0) {
    const { data: ceoRole, error: roleError } = await supabase
      .from("roles")
      .select("id")
      .ilike("role_name", "CEO")
      .single();

    if (roleError || !ceoRole) {
      return {
        success: false,
        message: "CEO role not found.",
      };
    }

    finalRoleId = ceoRole.id;
    finalManagerId = null;
  }

  /* ----------------------------------------
     Hash Password
  ---------------------------------------- */

  const passwordHash = await bcrypt.hash(password, 10);
  // start - deepak 03/08/2026//
  console.log("================================");
  console.log("departmentId:", departmentId);
  console.log("organizationId:", organizationId);
  console.log("Insert Data:", {
    department_id: departmentId,
    organization_id: organizationId,
  });
  console.log("================================");
  // end - deepak 03/08/2026//
  /* ----------------------------------------
     Insert User
  ---------------------------------------- */

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        employee_id: employeeId,
        first_name: firstName,
        last_name: lastName,
        email,
        mobile,
        password_hash: passwordHash,
        organization_id: organizationId || null,
        department_id: departmentId || null,
        role_id: finalRoleId || null,
        manager_id: finalManagerId || null,

        designation,
        joining_date: joiningDate,
        employment_type: employmentType,

        status,
      },
    ])
    .select()
    .single();
  // Replaced Deepak - 03/08/2026 - Start//
  if (error) {
    console.log("Supabase Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
  // Replaced Deepak - 03/08/2026 - End//

  return {
    success: true,
    message: "User created successfully",
    user: data,
  };
};

exports.getAllUsers = async () => {
  const [usersResult, organizationsResult, departmentsResult, rolesResult] =
    await Promise.all([
      supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase.from("organizations").select("id, organization_name"),

      supabase.from("departments").select("id, department_name"),

      supabase.from("roles").select("id, role_name"),
    ]);

  if (usersResult.error)
    return {
      success: false,
      message: usersResult.error.message,
    };

  if (organizationsResult.error)
    return {
      success: false,
      message: organizationsResult.error.message,
    };

  if (departmentsResult.error)
    return {
      success: false,
      message: departmentsResult.error.message,
    };

  if (rolesResult.error)
    return {
      success: false,
      message: rolesResult.error.message,
    };

  const organizationMap = createLookupMap(organizationsResult.data);
  const departmentMap = createLookupMap(departmentsResult.data);
  const roleMap = createLookupMap(rolesResult.data);
  const managerMap = createLookupMap(usersResult.data);
  const users = usersResult.data.map((user) => {
    const organization = organizationMap.get(user.organization_id);
    const department = departmentMap.get(user.department_id);
    const role = roleMap.get(user.role_id);
    const manager = managerMap.get(user.manager_id);

    return {
      id: user.id,
      employee_id: user.employee_id,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      mobile: user.mobile,
      designation: user.designation,
      organization_id: user.organization_id,
      organization: organization?.organization_name || "-",
      department_id: user.department_id,
      department: department?.department_name || "-",
      role_id: user.role_id,
      role: role?.role_name || "-",
      manager_id: user.manager_id,
      reporting_manager: manager
        ? `${manager.first_name} ${manager.last_name}`
        : "-",
      joining_date: user.joining_date,
      employment_type: user.employment_type,
      profile_image: user.profile_image,
      status:
        user.status === true || user.status === "true" ? "Active" : "Inactive",
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  });

  return {
    success: true,
    users,
  };
};

exports.getUserById = async (id) => {
  const [
    userResult,
    organizationsResult,
    departmentsResult,
    rolesResult,
    managersResult,
  ] = await Promise.all([
    supabase.from("users").select("*").eq("id", id).single(),
    supabase.from("organizations").select("id, organization_name"),
    supabase.from("departments").select("id, department_name"),
    supabase.from("roles").select("id, role_name"),
    supabase.from("users").select("id, first_name, last_name"),
  ]);

  if (userResult.error) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const organizationMap = createLookupMap(organizationsResult.data);
  const departmentMap = createLookupMap(departmentsResult.data);
  const roleMap = createLookupMap(rolesResult.data);
  const managerMap = createLookupMap(managersResult.data);
  const user = userResult.data;

  return {
    success: true,
    user: {
      id: user.id,
      employee_id: user.employee_id,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      mobile: user.mobile,
      designation: user.designation,
      organization_id: user.organization_id,
      organization:
        organizationMap.get(user.organization_id)?.organization_name || "-",
      department_id: user.department_id,
      department: departmentMap.get(user.department_id)?.department_name || "-",
      role_id: user.role_id,
      role: roleMap.get(user.role_id)?.role_name || "-",
      manager_id: user.manager_id,
      reporting_manager: managerMap.get(user.manager_id)
        ? `${managerMap.get(user.manager_id).first_name} ${managerMap.get(user.manager_id).last_name}`
        : "-",
      joining_date: user.joining_date,
      employment_type: user.employment_type,
      profile_image: user.profile_image,
      status:
        user.status === true || user.status === "true" ? "Active" : "Inactive",
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

exports.updateUser = async (id, userData) => {
  const updateData = {
    employee_id: userData.employeeId,
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    mobile: userData.mobile,
    organization_id: userData.organizationId || null,
    department_id: userData.departmentId || null,
    role_id: userData.roleId || null,
    manager_id: userData.managerId || null,
    designation: userData.designation,
    joining_date: userData.joiningDate,
    employment_type: userData.employmentType,
    status: userData.status,
    updated_at: new Date(),
  };

  if (userData.password && userData.password.trim() !== "") {
    updateData.password_hash = await bcrypt.hash(userData.password, 10);
  }

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "User updated successfully",
    user: data,
  };
};

exports.deleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "User deleted successfully",
  };
};

exports.getManagers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      employee_id,
      first_name,
      last_name,
      designation,
      status
    `,
    )
    .eq("status", true)
    .order("first_name");

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const managers = data.map((manager) => ({
    id: manager.id,
    employee_id: manager.employee_id,
    full_name: `${manager.first_name} ${manager.last_name}`,
    designation: manager.designation,
    status:
      manager.status === true || manager.status === "true"
        ? "Active"
        : "Inactive",
  }));

  return {
    success: true,
    managers,
  };
};
