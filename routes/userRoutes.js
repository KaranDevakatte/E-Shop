const express = require("express");

const router = express.Router();

const { createUser, showSignup, showLogin, verifyUser, logoutUser } = require("../controllers/userController");

router.post("/", createUser)

router.get("/signup", showSignup)

router.get("/login", showLogin)

router.post("/verify", verifyUser)

router.get("/logout", logoutUser)

module.exports = router;