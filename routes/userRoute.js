const express = require("express");
const verifyToken = require("../middleware/isAuthenticated");
const router = express.Router();
const usersController = require("../controllers/userManagementController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

router.post("/signup", usersController.signupController);
router.post("/logout", usersController.logoutController);
router.post("/login", usersController.loginController);
router.get("/", isAuthenticated, isAdmin, usersController.getUsersController);
router.delete(
  "/deleteuser/:id",
  isAuthenticated,
  isAdmin,
  usersController.deleteUserController
);
router.put(
  "/updateuser/:id",
  isAuthenticated,
  isAdmin,
  usersController.updateUserController
);

module.exports = router;
