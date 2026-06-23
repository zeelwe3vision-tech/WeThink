// Chetan - 22/06/2026 - start

const supabase = require("../../config/supabase");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
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
    } = req.body;

const { data: existingUser, error: findError } = await supabase
  .from("users")
  .select("id")
  .eq("email", email)
  .maybeSingle();

if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const { data, error } = await supabase
  .from("users")
  .insert([
    {
      employee_id: employeeId,
      first_name: firstName,
      last_name: lastName,
      email,
      mobile,
      password: hashedPassword,
      role,
      department,
      reporting_manager: reportingManager,
      status,
    },
  ])
  .select();

if (error) {
  return res.status(500).json({
    message: error.message,
  });
}

res.status(201).json({
  message: "User created successfully",
  user: data[0],
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Chetan - 23/06/2026 - start
exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Chetan - 23/06/2026 - end

// Chetan - 22/06/2026 - end
