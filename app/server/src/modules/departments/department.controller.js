const departmentService = require("./department.service");

// Deepak - 03-08-2026 - Start

// ======================================
// Get All Departments
// Get Departments with Status, Category
// and Sort Filters
// ======================================

exports.getDepartments = async (req, res) => {
  try {
    const { status, category, sortBy } = req.query;
    const result = await departmentService.getDepartments(
      status,
      category,
      sortBy
    );

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Deepak - 03-08-2026 - End
exports.getDepartmentById = async (req, res) => {
  try {
    const result = await departmentService.getDepartmentById(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createDepartment = async (req, res) => {
  try {

    console.log("Create Payload:", req.body);

    const result = await departmentService.createDepartment(req.body);

    console.log("Create Result:", result);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {

    console.error("Create Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.updateDepartment = async (req, res) => {
  try {

    console.log("Update Body:", req.body);

    const result = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );

    console.log("Result:", result);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {

    console.error("Update Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const result = await departmentService.deleteDepartment(req.params.id);

    console.log(result);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deepak - 03-08-2026 - Start
// Additional Department Controller APIs
// Search Departments

// GET /api/departments/search?search=HR

exports.searchDepartments = async (req, res) => {

  try {

    const { search } = req.params;
    const result = await departmentService.searchDepartments(search);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};


// Get Departments By Status

// GET /api/departments/status/Active

exports.getDepartmentsByStatus = async (req, res) => {

  try {

    const { status } = req.params;

    const result = await departmentService.getDepartmentsByStatus(status);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get Departments By Category

// GET /api/departments/category/Technical

exports.getDepartmentsByCategory = async (req, res) => {

  try {

    const { category } = req.params;

    const result = await departmentService.getDepartmentsByCategory(category);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// Check Department Name

// GET /api/departments/check-name/HR

exports.checkDepartmentName = async (req, res) => {

  try {

    const { departmentName } = req.params;

    const result = await departmentService.checkDepartmentName(departmentName);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Check Department Code
// GET /api/departments/check-code/HR001

exports.checkDepartmentCode = async (req, res) => {

  try {

    const { departmentCode } = req.params;

    const result = await departmentService.checkDepartmentCode(departmentCode);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// Deepak - 03-08-2026 - End
