import mongoose, { Document, Schema, Types } from "mongoose";

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

const OrderSchema: Schema<IOrderDB> = new Schema<IOrderDB>({
  customer_details: {
    customer_id: String,
    customer_phone: String,
  },
  order_amount: Number,
  order_id: String,
  order_currency: String,
});

const orderModel = mongoose.model<IOrderDB>("cashfree_orders", OrderSchema);

export { orderModel, IOrderDB };
