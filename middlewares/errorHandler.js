import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
  const message = err.message || "Something went wrong.";
  res.status(statusCode).json({ msg: message });
};
