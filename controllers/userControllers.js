import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.status(StatusCodes.OK).json({ user });
};
