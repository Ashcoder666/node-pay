import express from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.get("/search", paymentController.searchUser);

export default router;
