import mongoose, { Schema, Document, Types } from "mongoose";

enum transactionStatus {
  processing = "PROCESSING",
  success = "SUCCESS",
}

interface ITransaction extends Document {
  _id: Types.ObjectId;
  sender_user_id: Types.ObjectId;
  receiver_user_id: Types.ObjectId;
  amount: number;
  status: transactionStatus;
  bank_reference_id: string;
}

const transactionSchema: Schema<ITransaction> = new Schema<ITransaction>({
  sender_user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  receiver_user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(transactionStatus),
    required: true,
  },
  bank_reference_id: {
    type: String,
    required: true,
  },
});

const transactionModel = mongoose.model<ITransaction>(
  "Wallet",
  transactionSchema
);

export default transactionModel;
