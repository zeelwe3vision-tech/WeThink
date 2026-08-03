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
  // Deepak - 03-08-2026 - Start//
router.get("/", departmentController.getDepartments);
router.get("/:id",departmentController.getDepartmentById);
// deepak - 03/08/26 - end
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);  

// Deepak - 03-08-2026 - Start//
// Search
router.get(
  "/search",
  departmentController.searchDepartments
);

// Status
router.get(
  "/status/:status",
  departmentController.getDepartmentsByStatus
);

// Category
router.get(
  "/category/:category",
  departmentController.getDepartmentsByCategory
);

// Check Name
router.get(
  "/check-name/:departmentName",
  departmentController.checkDepartmentName
);

// Check Code
router.get(
  "/check-code/:departmentCode",
  departmentController.checkDepartmentCode
);

// LAST lo undali
router.get("/:id", getDepartmentById);


// Deepak - 03/08/2026 - End
module.exports = router;
