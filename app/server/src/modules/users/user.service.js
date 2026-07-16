const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");

exports.createUser = async (userData) => {
  console.log("========== CREATE USER CALLED ==========");
  console.log(userData);
  
  const {
    employeeId,
    firstName,
    lastName,
    email,
    mobile,
    password,
    role,
    department,
    reportingManager,
    status,
  } = userData;

  // Check Existing User
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  // Hash Password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create User
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
        role,
        department,
        reporting_manager: reportingManager,
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

  // Get Role ID
  const { data: roleData, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("role_name", role)
    .single();

  if (roleError) {
    return {
      success: false,
      message: roleError.message,
    };
  }

  // Assign Role to User
  const { data: userRoleData, error: userRoleError } = await supabase
    .from("user_roles")
    .insert([
      {
        user_id: data[0].id,
        role_id: roleData.id,
      },
    ])
    .select();

  console.log("User Role Data:", userRoleData);
  console.log("User Role Error:", userRoleError);

  if (userRoleError) {
    return {
      success: false,
      message: userRoleError.message,
    };
  }

  return {
    success: true,
    message: "User created successfully",
    user: data[0],
  };
};

exports.getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    users: data,
  };
};
