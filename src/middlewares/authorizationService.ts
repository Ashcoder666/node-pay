import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

// Define a custom interface to extend the Express Request interface
interface AuthenticatedRequest extends Request {
  decoded?: any;
}

const tokenVerifier = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Token not found");
    }

    jwt.verify(
      token,
      "secret1234",
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: "Token verification failed" });
        }

        if (decoded) {
          req.decoded = decoded;
        }

        next();
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default tokenVerifier;
