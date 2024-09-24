const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/authenticantionHandler");

const userController = require("../controllers/userController");

router.get("/", middleware(["admin", "user"]), userController.getAllUsers);
router.get("/:id", middleware(["admin", "user"]), userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", middleware(["admin", "user"]), userController.updateUser);
router.delete("/:id", middleware(["admin", "user"]), userController.deleteUser);

module.exports = router;
