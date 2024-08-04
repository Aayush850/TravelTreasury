import bcrypt from "bcryptjs";

export const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};

export const comparePassword = async (actual_pass, encrypted_pass) => {
  const isMatch = await bcrypt.compare(actual_pass, encrypted_pass);
  return isMatch;
};
