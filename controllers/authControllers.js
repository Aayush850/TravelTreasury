import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import User from "../models/userModel.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { generateToken } from "../utils/tokenUtils.js";

const registerUser = async (req, res) => {
  const hashedPasswrod = await hashPassword(req.body.password);
  req.body.password = hashedPasswrod;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created", user });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await comparePassword(req.body.password, user.password))) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = generateToken({ userId: user._id });
  const oneDay = 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + oneDay);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    expires,
  });
  res.status(StatusCodes.OK).json({ msg: "User logged in." });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

export { registerUser, loginUser, logoutUser };
