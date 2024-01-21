import express from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.get("/search", paymentController.searchUser);
router.post("/create-order", paymentController.createOrder);
router.post("/create-order-pay", paymentController.createOrderPay);
router.post("/webhook", (req, res) => {
  console.log(req.body);
});

export default router;
