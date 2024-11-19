import { Request, Response } from "express";
import { ContactRequest } from "../types/contact";
import { transporter } from "../config/mailer";

export const handleContactSubmission = async (
  req: Request<{}, {}, ContactRequest>,
  res: Response
) => {
  try {
    const { name, email, message } = req.body;

    // Prepare email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sending to yourself
      replyTo: email, // Allow replying directly to the sender
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Contact submission received and email sent:", { name, email });

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error handling contact submission:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
