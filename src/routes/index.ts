import { Express } from "express";
import authRoute from "./authRoutes";
function routing(app: Express) {
  app.use("/", authRoute);
  app.use("*", (req, res, next) => {
    return res.status(404).json({
      message: "not-found",
      error: "not-found",
    });
  });
}
export default routing;
