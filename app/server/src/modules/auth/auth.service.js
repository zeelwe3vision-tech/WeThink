const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {
  console.log("========== LOGIN START ==========");
  console.log("Email Entered:", email);

  // Find User
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  console.log("Supabase Error:", error);
  console.log("User Found:", user);

  if (error || !user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // Account Locked
  console.log("Account Locked:", user.account_locked);

  if (user.account_locked) {
    return {
      success: false,
      message: "Account Locked",
    };
  }

  // Account Active
  console.log("Status:", user.status);

  if (!user.status) {
    return {
      success: false,
      message: "Account Inactive",
    };
  }

  // Password Compare
  console.log("Password Hash:", user.password_hash);

  const match = await bcrypt.compare(password, user.password_hash);

  console.log("Password Match:", match);

  if (!match) {
    await supabase
      .from("users")
      .update({
        failed_login_attempts: (user.failed_login_attempts || 0) + 1,
      })
      .eq("id", user.id);

    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  console.log("Password Verified");

  // Reset Failed Attempts
  await supabase
    .from("users")
    .update({
      failed_login_attempts: 0,
      last_login: new Date(),
    })
    .eq("id", user.id);

  // JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  console.log("JWT Created");

  // Session
  const { error: sessionError } = await supabase.from("login_sessions").insert([
    {
      user_id: user.id,
      jwt_token: token,
      login_time: new Date(),
      is_active: true,
    },
  ]);

  console.log("Session Error:", sessionError);

  // Audit
  const { error: auditError } = await supabase.from("audit_logs").insert([
    {
      user_id: user.id,
      action: "LOGIN",
      description: "User Logged In",
    },
  ]);

  console.log("Audit Error:", auditError);

  delete user.password_hash;

  console.log("========== LOGIN SUCCESS ==========");

  return {
    success: true,
    message: "Login Successful",
    token,
    user,
  };
};

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