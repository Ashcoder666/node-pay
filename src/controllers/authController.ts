import { Request, Response } from "express";
import helperFunctions from "../helpers/helperFunctions";
import authService from "../services/authService";
import { userModel } from "../models/userModel";
import { redis } from "../index";

const authController = {
  userRegistration: async (req: Request, res: Response) => {
    const { full_name, phone_number, email, bank_details, password } = req.body;

    try {
      const otp = helperFunctions.generateRandom4DigitNumber();
      const users = await userModel.findOne({ email });

      console.log(users);

      if (users) {
        throw new Error("Email id already exists");
      }

      await authService.registerUser(
        full_name,
        phone_number,
        email,
        bank_details,
        password
      );

      await helperFunctions.sendMail(email, otp);
      await redis.setex(email, 60, otp);

      res.status(201).json({ message: "otp send succesfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  verifyUser: async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    console.log(email, otp);

    try {
      const storedOTP = await redis.get(email);

      if (storedOTP == null) {
        throw new Error("otp doesnt exist");
      }

      if (storedOTP != otp) {
        throw new Error("Invalid OTP");
      }
      await userModel.updateOne({ email }, { verified: true });
      res.status(201).json({ message: "otp verified succesfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await authService.userLogin(email);
      if (!user) {
        throw new Error("user doesnt exist");
      }

      if (password != user.password) {
        throw new Error("Incorect Password");
      }

      res.status(200).json({ message: "logged in succesfully" });
      //send jwt token / cookies
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default authController;
