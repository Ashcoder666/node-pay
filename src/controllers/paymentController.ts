import { Request, Response } from "express";
import { userModel } from "../models/userModel";

interface AuthenticatedRequest extends Request {
  decoded?: any;
}

const paymentController = {
  searchUser: async (req: AuthenticatedRequest, res: Response) => {
    const email = req.decoded;
    const currentUserExits = await userModel.findOne({ email });
    if (!currentUserExits) {
      res.status(401).json({ message: "user doesnt exist anymore" });
    }
  },
};

export default paymentController;
