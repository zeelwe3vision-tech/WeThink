  //const express = require("express"); //
const express = require("express")
const router = express.Router();
//const router = express.Router();//
// Deepak - 03-08-2026 - Start//
const departmentController = require("./department.controller");
const departmentValidation = require("./department.validation");
// Deepak - 03-08-2026 - End//
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./department.controller");

  //router.get("/", getDepartments);//
router.get("/", departmentController.getDepartments);

// Search
router.get("/search/:search", departmentController.searchDepartments);

// Status
router.get("/status/:status", departmentController.getDepartmentsByStatus);

// Category
router.get("/category/:category", departmentController.getDepartmentsByCategory);

// Check Name
router.get("/check-name/:departmentName", departmentController.checkDepartmentName);

// Check Code
router.get("/check-code/:departmentCode", departmentController.checkDepartmentCode);

// Get By Id (LAST)
router.get("/:id", departmentController.getDepartmentById);

router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);
module.exports = router;
