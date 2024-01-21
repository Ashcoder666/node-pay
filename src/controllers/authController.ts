import { Request, Response } from "express";
import helperFunctions from "../helpers/helperFunctions";
import authService from "../services/authService";
import { userModel } from "../models/userModel";
import { redis } from "../index";
import { JWT_ACCESS_SECRET } from "../constants";
import rateLimit from "express-rate-limit";
const authController = {
  userRegistration: async (req: Request, res: Response) => {
    const { full_name, phone_number, email, bank_details, password } = req.body;

    try {
      const otp = helperFunctions.generateRandom4DigitNumber();
      const users = await userModel.findOne({ email });
      const phoneUser = await userModel.findOne({ phone_number });
      console.log(users);

      if (users) {
        throw new Error("Email id already exists");
      }
      if (phoneUser) {
        throw new Error("phone number already exists");
      }

      await authService.registerUser(
        full_name,
        phone_number,
        email,
        bank_details,
        password
      );

      await helperFunctions.sendMail(email, otp);
      await redis.setex(email, 300, otp);

      return res.status(201).json({ message: "otp send succesfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  verifyUser: async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    console.log(email, otp, JWT_ACCESS_SECRET);

    try {
      const storedOTP = await redis.get(email);

      const users = await userModel.findOne({ email });

      if (!users) {
        throw new Error("user doesnt exist");
      }

      if (storedOTP == null) {
        const otp = helperFunctions.generateRandom4DigitNumber();
        await helperFunctions.sendMail(email, otp);
        await redis.setex(email, 60, otp);
        return res
          .status(201)
          .json({ message: "otp doesnt exist ,  resending OTP succesfully" });
      }

      if (storedOTP != otp) {
        throw new Error("Invalid OTP");
      }
      await userModel.updateOne({ email }, { verified: true });
      return res.status(201).json({ message: "otp verified succesfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await authService.userLogin(email);
      if (!user) {
        throw new Error("user doesnt exist");
      }
      if (!user.verified) {
        throw new Error("user not verified , please verify email");
      }

      if (password != user.password) {
        throw new Error("Incorect Password");
      }

      const token = authService.jwtTokenGeneration(email);

      return res.status(200).json({ message: "logged in succesfully", token });
      //send jwt token / cookies
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  otpLimiter: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Max requests per windowMs
    message: "Too many OTP requests from this IP, please try again later.",
  }),
};

export default authController;
