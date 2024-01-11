import { Request, Response } from "express";
import UserService from "../services/userService";
const userController = {
  register: async (req: Request, res: Response) => {
    const { full_name, phone_number, email, bank_details } = req.body;

    try {
      const newUser = await UserService.userSignup(
        full_name,
        phone_number,
        email,
        bank_details
      );

      res.status(201).json({ status: "success", data: newUser });
    } catch (error: any) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

export default userController;
