const { body, validationResult } = require("express-validator");

exports.createUserValidation = [
  body("employeeId").notEmpty().withMessage("Employee ID is required"),

  body("firstName").notEmpty().withMessage("First Name is required"),

  body("lastName").notEmpty().withMessage("Last Name is required"),

  body("email").isEmail().withMessage("Valid Email is required"),

  body("mobile").notEmpty().withMessage("Mobile Number is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("organizationId").notEmpty().withMessage("Organization is required"),

  body("departmentId").notEmpty().withMessage("Department is required"),

  body("roleId").notEmpty().withMessage("Role is required"),

  body("designation").notEmpty().withMessage("Designation is required"),

  body("joiningDate").notEmpty().withMessage("Joining Date is required"),

  body("employmentType").notEmpty().withMessage("Employment Type is required"),

  body("status").isBoolean().withMessage("Status must be true or false"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];
