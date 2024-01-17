import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import paymentService from "../services/paymentService";

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
    const searchingNumber = req.query.search;

    try {
      if (searchingNumber == null || searchingNumber === undefined) {
        throw new Error("search field is missing");
      }

      const searchingNumberINT = parseInt(searchingNumber as string, 10);

      const targetUser = await paymentService.searchNumber(searchingNumberINT);

      if (!targetUser) {
        throw new Error("phone number doesnt exist");
      }

      res.status(200).json({ message: "success", user: targetUser.full_name });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;
