import { userModel } from "../models/userModel";

const paymentService = {
  searchNumber: async (number: number) => {
    const user = await userModel.findOne({ phone_number: number });
    return user;
  },
};

export default paymentService;
