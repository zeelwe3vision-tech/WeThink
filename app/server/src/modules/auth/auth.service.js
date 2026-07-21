const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

console.log("========== LOGIN START ==========");
console.log("Email:", email);

const { data: user, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .single();

console.log("Supabase Error:", error);
console.log("User:", user);

if (!user) {
  return {
    success: false,
    message: "User not found",
  };
}

console.log("Stored Hash:", user.password_hash);

const match = await bcrypt.compare(password, user.password_hash);

console.log("Password Match:", match);

if (!match) {
  return {
    success: false,
    message: "Password mismatch",
  };
}

exports.bootstrapStatus = async () => {
  const { count, error } = await supabase.from("users").select("*", {
    count: "exact",
    head: true,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    initialized: count > 0,
  };
};

exports.bootstrap = async (userData) => {
  const { count } = await supabase.from("users").select("*", {
    count: "exact",
    head: true,
  });

  if (count > 0) {
    return {
      success: false,
      message: "System already initialized",
    };
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        employee_id: userData.employeeId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        mobile: userData.mobile,
        password_hash: passwordHash,

        organization_id: userData.organizationId || null,
        department_id: userData.departmentId || null,

        // CEO Role
        role_id: userData.roleId,

        manager_id: null,

        designation: "CEO",

        joining_date: new Date(),

        employment_type: "Full Time",

        status: true,
      },
    ])
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
    message: "CEO account created successfully",
    user: data,
  };
};