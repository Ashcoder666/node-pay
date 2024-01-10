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
}
