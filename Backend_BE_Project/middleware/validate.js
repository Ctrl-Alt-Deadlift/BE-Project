import { body, validationResult } from 'express-validator';

export const registerValidationRules = [
  // Name Validation
  body('name')
    .trim() // Removes leading/trailing whitespace
    .notEmpty()
    .withMessage('Name is required.'),

  // Email Validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  // Phone Validation using express-validator's built-in isMobilePhone
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    // 'en-IN' for Indian mobile numbers
    .isMobilePhone('en-IN') // Using 'en-IN' for India, you can change this locale if needed
    .withMessage('Please enter a valid 10-digit Indian mobile number.'),

  // Password Validation (as before)
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/) // Matches any character that is not alphanumeric
    .withMessage('Password must contain at least one special character'),
];


export const loginValidationRules = [
  body('emailOrPhone')
    .trim()
    .notEmpty()
    .withMessage('Email or phone is required.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
];


export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Get the first error object from the array of errors
    const firstError = errors.array()[0];

    // Send only the 'msg' property of the first error
    return res.status(400).json({ message: firstError.msg });
  }

  next(); // If no errors, proceed to the next middleware/route handler
};