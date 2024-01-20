import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import paymentService from "../services/paymentService";
import axios from "axios";

interface AuthenticatedRequest extends Request {
  decoded?: any;
}

const paymentController = {
  searchUser: async (req: AuthenticatedRequest, res: Response) => {
    // const email = req.decoded;
    // const currentUserExits = await userModel.findOne({ email });
    // if (!currentUserExits) {
    // return  res.status(401).json({ message: "user doesnt exist anymore" });
    // }
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

      return res
        .status(200)
        .json({ message: "success", user: targetUser.full_name });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  // createOrder: async (req: Request, res: Response) => {
  //   const url = "https://sandbox.cashfree.com/pg/orders";

  //   const headers = {
  //     // accept: "application/json",
  //     // "content-type": "application/json",
  //     "x-client-id": process.env.CASHFREE_APP_ID,
  //     "x-client-secret": process.env.CASHFREE_SECRET,
  //     "x-api-version": "2022-09-01",
  //   };

  //   const data = {
  //     customer_details: {
  //       customer_id: "terrgdg34",
  //       customer_phone: "3534556363",
  //     },
  //     order_amount: 10000,
  //     order_id: "3445334",
  //     order_currency: "INR",
  //   };
  //   try {
  //     const response = await axios.post(url, data, { headers });

  //     console.log(response.data);

  //     return res.json({ res: response.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  createOrder: async (req: Request, res: Response) => {
    const { customer_details, order_amount, order_id, order_currency } =
      req.body;
    try {
      const response = await paymentService.createOrder(
        customer_details,
        order_amount,
        order_id,
        order_currency
      );

      return res.status(200).json({ message: "success", data: response });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;

// on next sitting fix cashfree order and do payment and checout webhook
