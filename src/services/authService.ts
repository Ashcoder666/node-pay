import helperFunctions from "../helpers/helperFunctions";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_EXPIRY, JWT_ACCESS_SECRET } from "../constants";
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

  userLogin: async (email: string) => {
    const user = await userModel.findOne({ email });

    return user;
  },
  jwtTokenGeneration: (id: string) => {
    const token = jwt.sign({ _id: id }, "secret1234", {
      expiresIn: JWT_ACCESS_EXPIRY,
    });

    return token;
  },
};

export default authService;
