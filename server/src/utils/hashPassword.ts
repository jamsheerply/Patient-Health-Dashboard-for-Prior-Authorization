import bcrypt from "bcryptjs";

// Define the correct return type as 'string'
export const hashPassword = (pass: string): string => {
  return bcrypt.hashSync(pass, 10);
};
