import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 4000;
export const DEVELOPMENT_URL = `http://localhost:${PORT}`;
export const PRODUCTION_URL = process.env.PRODUCTION_URL;
export const HOST_URL =
  NODE_ENV === "development" ? DEVELOPMENT_URL : PRODUCTION_URL;
export const SWAGGER_URL = `${HOST_URL}/api-docs/`;
export const MONGODB_URI = process.env.MONGODBURI;
export const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
