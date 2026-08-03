const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {
  // Find User
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // Account Locked
  if (user.account_locked) {
    return {
      success: false,
      message: "Account Locked",
    };
  }

  // Account Active
  if (!user.status) {
    return {
      success: false,
      message: "Account Inactive",
    };
  }

  // Password Compare
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    await supabase
      .from("users")
      .update({
        failed_login_attempts: user.failed_login_attempts + 1,
      })
      .eq("id", user.id);

    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // Reset Failed Attempts
  await supabase
    .from("users")
    .update({
      failed_login_attempts: 0,
      last_login: new Date(),
    })
    .eq("id", user.id);

  // JWT Token
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

  // Login Session
  const { error: sessionError } = await supabase.from("login_sessions").insert([
    {
      user_id: user.id,
      jwt_token: token,
      login_time: new Date(),
      is_active: true,
    },
  ]);

  console.log("Session Error:", sessionError);

  // Audit Log
  const { error: auditError } = await supabase.from("audit_logs").insert([
    {
      user_id: user.id,
      action: "LOGIN",
      description: "User Logged In",
    },
  ]);

  console.log("Audit Error:", auditError);

  delete user.password_hash;

  return {
    success: true,

    message: "Login Successful",

    token,

    user,
  };
};;
