import mongoose, { Schema, Document, Types } from "mongoose";

interface IWallet extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  wallet_balance: number;
  status: boolean;
}

const walletSchema: Schema<IWallet> = new Schema<IWallet>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  wallet_balance: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const WalletModel = mongoose.model<IWallet>("Wallet", walletSchema);

export default WalletModel;
