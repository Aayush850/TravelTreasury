import { UnauthenticatedError } from "../errors/customError.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticationMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId } = verifyToken(token);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
