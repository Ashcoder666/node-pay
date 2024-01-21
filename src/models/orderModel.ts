import mongoose, { Document, Types } from "mongoose";

interface IOrder extends Document {
  customer_details: {
    customer_id: string;
    customer_phone: string;
  };
  order_amount: number;
  order_id: string;
  order_currency: string;
}

interface IOrderDB extends IOrder, Document {
  _id: Types.ObjectId;
}
