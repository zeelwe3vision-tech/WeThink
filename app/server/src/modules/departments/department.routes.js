  //const express = require("express"); //
const express = require("express")
const router = express.Router();
//const router = express.Router();//

const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./department.controller");

  //router.get("/", getDepartments);//
router.get("/", departmentController.getDepartments);
router.get("/:id", getDepartmentById);
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);  

module.exports = router;
