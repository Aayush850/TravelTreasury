import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authControllers.js";
import {
  validateRegisterInputs,
  validateLoginInputs,
} from "../middlewares/validation.js";

const router = express.Router();

router.post("/register", validateRegisterInputs, registerUser);
router.post("/login", validateLoginInputs, loginUser);
router.get("/logout", logoutUser);

export default router;
