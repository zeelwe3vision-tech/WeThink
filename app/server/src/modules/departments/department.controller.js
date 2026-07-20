const departmentService = require("./department.service");

exports.getDepartments = async (req, res) => {
  try {
    const result = await departmentService.getDepartments();

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
    const result = await departmentService.createDepartment(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const result = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );

    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const result = await departmentService.deleteDepartment(
      req.params.id
    );

    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};