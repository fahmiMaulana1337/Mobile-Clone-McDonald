const express = require("express");
const router = express.Router();

const {
  findAllUsers,
  createUser,
  findUserById,
  deleteUser
} = require("../controllers/controller");

router.get("/", findAllUsers);
router.post("/", createUser);
router.get("/:id", findUserById);
router.delete('/:id',deleteUser)

module.exports = router;
