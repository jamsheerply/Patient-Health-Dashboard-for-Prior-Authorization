import Joi from "joi";

// Regular expressions
const nameRegex = /^[a-zA-Z\s'-]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Custom messages
const messages = {
  name: {
    "string.pattern.base":
      "Name must contain only letters, spaces, hyphens, and apostrophes",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters",
  },
  age: {
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 0",
    "number.max": "Age cannot exceed 150",
  },
  date: {
    "string.pattern.base": "Date must be in YYYY-MM-DD format",
    "date.base": "Invalid date",
    "date.max": "Date cannot be in the future",
  },
};

// Query validation schema
const getPatientQuerySchema = Joi.object({
  limit: Joi.number().min(1).max(100).default(10).messages({
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),

  offset: Joi.number().min(0).default(0).messages({
    "number.min": "Offset cannot be negative",
  }),

  search: Joi.string().trim().min(1).max(100).allow(""),

  sortBy: Joi.string()
    .valid("name", "age", "condition", "createdAt", "updatedAt")
    .default("createdAt")
    .messages({
      "any.only":
        "Sort field must be one of: name, age, condition, createdAt, updatedAt",
    }),

  sortOrder: Joi.string().valid("asc", "desc").default("desc").messages({
    "any.only": "Sort order must be either 'asc' or 'desc'",
  }),

  ageMin: Joi.number().min(0).max(150).messages({
    "number.min": "Minimum age cannot be negative",
    "number.max": "Maximum age cannot exceed 150",
  }),

  ageMax: Joi.number().min(0).max(150).greater(Joi.ref("ageMin")).messages({
    "number.min": "Maximum age cannot be negative",
    "number.max": "Maximum age cannot exceed 150",
    "number.greater": "Maximum age must be greater than minimum age",
  }),

  condition: Joi.string().trim().min(1).max(100).allow(""),

  startDate: Joi.date().iso().max("now").messages(messages.date),

  endDate: Joi.date()
    .iso()
    .max("now")
    .greater(Joi.ref("startDate"))
    .messages({
      ...messages.date,
      "date.greater": "End date must be after start date",
    }),
});

// Medical history schema
const medicalHistorySchema = Joi.object({
  date: Joi.date().iso().max("now").required().messages(messages.date),

  treatment: Joi.string().trim().min(2).max(500).required().messages({
    "string.empty": "Treatment description is required",
    "string.min": "Treatment description must be at least 2 characters",
    "string.max": "Treatment description cannot exceed 500 characters",
  }),

  notes: Joi.string().trim().max(1000).allow("").messages({
    "string.max": "Notes cannot exceed 1000 characters",
  }),
});

// Medication schema
const medicationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Medication name is required",
    "string.min": "Medication name must be at least 2 characters",
    "string.max": "Medication name cannot exceed 100 characters",
  }),

  dosage: Joi.string().trim().min(1).max(50).required().messages({
    "string.empty": "Dosage is required",
    "string.min": "Dosage must be at least 1 character",
    "string.max": "Dosage cannot exceed 50 characters",
  }),

  startDate: Joi.date().iso().max("now").required().messages(messages.date),

  endDate: Joi.date()
    .iso()
    .min(Joi.ref("startDate"))
    .allow(null)
    .messages({
      ...messages.date,
      "date.min": "End date must be after start date",
    }),
});

// Lab result schema
const labResultSchema = Joi.object({
  date: Joi.date().iso().max("now").required().messages(messages.date),

  test: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Test name is required",
    "string.min": "Test name must be at least 2 characters",
    "string.max": "Test name cannot exceed 100 characters",
  }),

  result: Joi.string().trim().min(1).max(500).required().messages({
    "string.empty": "Test result is required",
    "string.min": "Test result must be at least 1 character",
    "string.max": "Test result cannot exceed 500 characters",
  }),
});

// Main patient validation schema
const patientsValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(nameRegex)
    .min(2)
    .max(100)
    .required()
    .messages(messages.name),

  age: Joi.number().min(0).max(150).required().messages(messages.age),

  condition: Joi.string().trim().min(2).max(200).required().messages({
    "string.empty": "Medical condition is required",
    "string.min": "Medical condition must be at least 2 characters",
    "string.max": "Medical condition cannot exceed 200 characters",
  }),

  medicalHistory: Joi.array()
    .items(medicalHistorySchema)
    .min(0)
    .max(100)
    .messages({
      "array.max": "Cannot exceed 100 medical history entries",
    }),

  medications: Joi.array().items(medicationSchema).min(0).max(50).messages({
    "array.max": "Cannot exceed 50 medication entries",
  }),

  labResults: Joi.array().items(labResultSchema).min(0).max(100).messages({
    "array.max": "Cannot exceed 100 lab result entries",
  }),
});

export {
  getPatientQuerySchema,
  patientsValidationSchema,
  medicalHistorySchema,
  medicationSchema,
  labResultSchema,
};
