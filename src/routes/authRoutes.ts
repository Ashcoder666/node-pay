import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/register", authController.userRegistration);
router.post("/verify-otp", authController.verifyUser);
export default router;
