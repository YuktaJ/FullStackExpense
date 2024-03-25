const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/sign-up", userController.postSignup);

router.post("/login", userController.postLogin);

router.post(
  "/forgot-password",

  userController.postForgotPassword
);

router.use(
  "/updatepassword/:resetpasswordid",

  userController.updatePassword
);
router.get("/resetpassword/:id", userController.getResetPassword);

module.exports = router;
