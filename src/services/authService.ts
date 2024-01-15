import helperFunctions from "../helpers/helperFunctions";
import { userModel } from "../models/userModel";
const authService = {
  registerUser: async (
    full_name: string,
    phone_number: number,
    email: string,
    bank_details: {
      account_no: number;
      ifsc: string;
      bank_name: string;
    },
    password: string
  ) => {
    const newUser = await userModel.create({
      full_name,
      phone_number,
      email,
      bank_details,
      password,
    });

    return newUser;
  },
};

export default authService;
