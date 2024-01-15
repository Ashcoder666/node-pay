import { Request, Response } from "express";
import UserService from "../services/userService";
import authService from "../services/authService";
const userController = {
  register: async (req: Request, res: Response) => {
    const { full_name, phone_number, email, bank_details } = req.body;
    // generate otp

    try {
      // const newUser = await UserService.userSignup(
      //   full_name,
      //   phone_number,
      //   email,
      //   bank_details
      // );
      // const eem = await authService.sendOTP(email);
      // console.log(eem);
      res.status(201).json({ status: "success" });
    } catch (error: any) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

export default userController;
