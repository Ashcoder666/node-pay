import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParse from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import { swaggerSpecs } from "./config/swaggerConfig";
import { PORT, HOST_URL, SWAGGER_URL } from "./constants";
import routing from "./routes";
import connectDatabase from "./config/database";

const app: Express = express();
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
routing(app);

connectDatabase();
app.listen(PORT, () => {
  console.log(`Server is listening at ${HOST_URL}`);
  console.log(`API Documentation: ${SWAGGER_URL}`);
});
