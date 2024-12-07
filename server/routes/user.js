const router = require("express").Router();
const userController = require("../controllers/user");
const { auth } = require("../utils/auth");

//register user
router.post("/register", userController.registerUser);
//login user
router.post("/login", userController.loginUser);

module.exports = router;
