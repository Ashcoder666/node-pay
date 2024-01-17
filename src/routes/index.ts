import { Express } from "express";
import authRoute from "./authRoutes";
import paymentRoute from "./paymentRoutes";
import tokenVerifier from "../middlewares/authorizationService";
function routing(app: Express) {
  app.use("/", authRoute);
  app.use("/payment", tokenVerifier, paymentRoute);
  app.use("*", (req, res, next) => {
    return res.status(404).json({
      message: "not-found",
      error: "not-found",
    });
  });
}
export default routing;
