exports.createUserValidation = (req, res, next) => {
  const { employeeId, firstName, email, password, role } = req.body;

  if (!employeeId) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required",
    });
  }

  if (!firstName) {
    return res.status(400).json({
      success: false,
      message: "First Name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (!role) {
    return res.status(400).json({
      success: false,
      message: "Role is required",
    });
  }

  next();
};
