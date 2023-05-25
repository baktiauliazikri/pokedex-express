const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

//post register
router.post("/register", authController.register);

//post login
router.post("/login", authController.login);

module.exports = router;
