import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  throw new Error("Gmail credentials not found in environment variables");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
