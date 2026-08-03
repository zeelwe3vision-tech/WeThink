module.exports = {};

// Deepak - 03/08/2026 - Start

// ======================================
// Create Department Validation
// ======================================

exports.validateCreateDepartment = (req, res, next) => {

  const {

    departmentName,
    departmentCode,
    category,
    organizationId,

  } = req.body;

  // Department Name

  if (!departmentName || departmentName.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Department Name is required.",

    });

  }

  // Department Code

  if (!departmentCode || departmentCode.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Department Code is required.",

    });

  }

  // Category

  if (!category || category.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Category is required.",

    });

  }

  // Organization Id

  if (!organizationId || organizationId.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Organization Id is required.",

    });

  }

  next();

};

// ======================================
// Update Department Validation
// ======================================

exports.validateUpdateDepartment = (req, res, next) => {

  const {

    departmentName,
    departmentCode,
    category,
    organizationId,

  } = req.body;

  if (!departmentName || departmentName.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Department Name is required.",

    });

  }

  if (!departmentCode || departmentCode.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Department Code is required.",

    });

  }

  if (!category || category.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Category is required.",

    });

  }

  if (!organizationId || organizationId.trim() === "") {

    return res.status(400).json({

      success: false,
      message: "Organization Id is required.",

    });

  }

  next();

};

// Deepak - 03/08/2026 - End