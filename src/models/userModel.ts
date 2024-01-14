import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  full_name: string;
  phone_number: number;
  email: string;
  bank_details: {
    account_no: number;
    ifsc: string;
    bank_name: string;
  };
  verified: boolean;
  password: string;
}

interface IUserDB extends IUser, Document {
  _id: Types.ObjectId;
}

const userSchema: Schema<IUserDB> = new Schema<IUserDB>({
  full_name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  email: { type: String, required: true },
  bank_details: {
    account_no: { type: Number, required: true },
    ifsc: { type: String, required: true },
    bank_name: { type: String, required: true },
  },
  verified: { type: Boolean, default: false },
  password: { type: String, required: true },
});

const userModel = mongoose.model<IUserDB>("users", userSchema);

export { userModel, IUserDB };
