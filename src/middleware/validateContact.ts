import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateContactRequest = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
