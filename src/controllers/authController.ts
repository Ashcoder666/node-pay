import { Request, Response } from "express";
import helperFunctions from "../helpers/helperFunctions";
import authService from "../services/authService";
import { userModel } from "../models/userModel";

const authController = {
  userRegistration: async (req: Request, res: Response) => {
    const { full_name, phone_number, email, bank_details, password } = req.body;

    try {
      const otp = helperFunctions.generateRandom4DigitNumber();

      await helperFunctions.sendMail(email, otp);

      await authService.registerUser(
        full_name,
        phone_number,
        email,
        bank_details,
        password
      );

      res.status(201).json({ message: "otp send succesfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  verifyUser: async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    console.log(email, otp);
    try {
      await userModel.updateOne({ email }, { verified: true });
      res.status(201).json({ message: "otp verified succesfully" });
    } catch (error) {}
  },
};

export default authController;
