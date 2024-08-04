import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyToken = (value) => {
  const decoded = jwt.verify(value, process.env.JWT_SECRET);
  return decoded;
};
