import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/register", authController.userRegistration);
router.post("/verify-otp");
router.post(
  "/verify-otp",
  authController.otpLimiter,
  authController.verifyUser
);
router.post("/login", authController.login);
export default router;
