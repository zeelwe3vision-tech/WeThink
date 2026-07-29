const express = require("express");
const router = express.Router();

const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  cloneRole,
} = require("./role.controller");

router.get("/", getRoles);
router.get("/:id", getRoleById);
router.post("/", createRole);
router.put("/:id", updateRole);
router.post("/:id/clone", cloneRole);
router.delete("/:id", deleteRole);


module.exports = router;
