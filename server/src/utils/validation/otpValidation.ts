import Joi from "joi";

const otpValidationSchema = Joi.object({
  otp: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "OTP must be a 6-digit number",
      "any.required": "OTP is required",
    }),

  username: Joi.string().min(3).max(30).required().pattern(/^\S*$/).messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must not exceed 30 characters",
    "any.required": "Username is required",
    "string.pattern.base": "Username must not contain spaces",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .pattern(/^\S*$/)
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
      "string.pattern.base": "Email must not contain spaces",
    }),

  password: Joi.string().min(6).required().pattern(/^\S*$/).messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
    "string.pattern.base": "Password must not contain spaces",
  }),
});

// Export the schema using ES Module syntax
export default otpValidationSchema;
