import { userModel } from "../models/userModel";

const UserService = {
  userSignup: async (
    full_name: string,
    phone_number: number,
    email: string,
    bank_details: {
      account_no: number;
      ifsc: string;
      bank_name: string;
    }
  ) => {
    const newUser = await userModel.create({
      full_name,
      phone_number,
      email,
      bank_details,
    });

    return newUser;
  },
};

export default UserService;
