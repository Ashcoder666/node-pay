import { Express } from "express";
import userRouter from "./userRoutes";
function routing(app: Express) {
  // app.use("/user", userRouter);
  app.use("*", (req, res, next) => {
    return res.status(404).json({
      message: "not-found",
      error: "not-found",
    });
  });
}
export default routing;
