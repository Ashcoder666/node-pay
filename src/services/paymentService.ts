import { Types } from "mongoose";
import { userModel } from "../models/userModel";
import axios from "axios";

interface IcustomerDetails {
  customer_id: Types.ObjectId;
  customer_phone: string;
}

// interface IpaymentDetails {
//   channel: string;
// }

const paymentService = {
  searchNumber: async (number: number) => {
    const user = await userModel.findOne({ phone_number: number });
    return user;
  },
  createOrder: async (
    customer_details: IcustomerDetails,
    order_amount: number,
    order_id: string,
    order_currency: string
  ) => {
    const url = "https://sandbox.cashfree.com/pg/orders";
    const headers = {
      // accept: "application/json",
      // "content-type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET,
      "x-api-version": "2022-09-01",
    };

    const data = {
      customer_details,
      order_amount,
      order_id,
      order_currency,
    };
    try {
      const response = await axios.post(url, data, { headers });
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message);
    }
  },
  createOrderPay: async (session_id: string, payment_method: any) => {
    const url = "https://sandbox.cashfree.com/pg/orders/sessions";
    const headers = {
      // accept: "application/json",
      // "content-type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET,
      "x-api-version": "2022-09-01",
    };
    const data = {
      payment_session_id: session_id,
      payment_method,
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.data;
    }
  },
};

export default paymentService;
