const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* =========================================================
   LOGIN
========================================================= */

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

  console.log("Account Locked:", user.account_locked);

  if (user.account_locked) {
    return {
      success: false,
      message: "Account Locked",
    };
  }

  console.log("Status:", user.status);

  if (!user.status) {
    return {
      success: false,
      message: "Account Inactive",
    };
  }

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

  await supabase
    .from("users")
    .update({
      failed_login_attempts: 0,
      last_login: new Date(),
    })
    .eq("id", user.id);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  console.log("JWT Created");

  const { error: sessionError } = await supabase.from("login_sessions").insert([
    {
      user_id: user.id,
      jwt_token: token,
      login_time: new Date(),
      is_active: true,
    },
  ]);

  console.log("Session Error:", sessionError);

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

/* =========================================================
   BOOTSTRAP STATUS
========================================================= */

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

/* =========================================================
   BOOTSTRAP CEO
========================================================= */

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

exports.googleLogin = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email } = payload;

    // Find existing employee
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return {
        success: false,
        message: "Employee is not registered. Please contact HR/Admin.",
      };
    }

    if (!user.status) {
      return {
        success: false,
        message: "Account Inactive",
      };
    }

    // Save google id if first Google login
    if (!user.google_id) {
      await supabase
        .from("users")
        .update({
          google_id: sub,
          auth_provider: "GOOGLE",
          last_login: new Date(),
        })
        .eq("id", user.id);
    } else {
      await supabase
        .from("users")
        .update({
          last_login: new Date(),
        })
        .eq("id", user.id);
    }

    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    await supabase.from("login_sessions").insert([
      {
        user_id: user.id,
        jwt_token: jwtToken,
        login_time: new Date(),
        is_active: true,
      },
    ]);

    await supabase.from("audit_logs").insert([
      {
        user_id: user.id,
        action: "GOOGLE_LOGIN",
        description: "User Logged In Using Google",
      },
    ]);

    delete user.password_hash;

    return {
      success: true,
      message: "Google Login Successful",
      token: jwtToken,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
