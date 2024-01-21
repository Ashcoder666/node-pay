import express from "express";
import paymentController from "../controllers/paymentController";
import tokenVerifier from "../middlewares/authorizationService";

const router = express.Router();

router.use(tokenVerifier);

router.get("/search", paymentController.searchUser);
router.post("/create-order", paymentController.createOrder);
router.post("/create-order-pay", paymentController.createOrderPay);
router.post("/webhook", (req, res) => {
  console.log(req.body);
});

export default router;
