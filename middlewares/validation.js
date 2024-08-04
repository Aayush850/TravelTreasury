import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
import User from "../models/userModel.js";
import Journal from "../models/journalModel.js";
import mongoose from "mongoose";

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Journal with")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateIdParam = withValidationError([
  param("id").custom(async (id, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("Invalid MongoDB Id");
    const journal = await Journal.findById(id);
    if (!journal) throw new Error(`Journal with the id ${id} doesn't exist`);
    const isOwner = journal.createdBy.toString() === req.user.userId;
    if (!isOwner) throw new Error("Not authorized to access this route");
  }),
]);

export const validateRegisterInputs = withValidationError([
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("Username already taken.");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User with the email already exists.");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
]);

export const validateLoginInputs = withValidationError([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),
  body("password").trim().notEmpty().withMessage("Password is required"),
]);

export const validateJournalInputs = withValidationError([
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Invalid date"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters long"),
]);
