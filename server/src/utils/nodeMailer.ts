import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Define the Notification interface
interface Notification {
  recipientEmail: string;
  subject: string;
  content: string;
}

// Create email template function
const createEmailTemplate = (notification: Notification): string => {
  return `
    <html>
      <body>
        <h1>${notification.subject}</h1>
        <p>${notification.content}</p>
      </body>
    </html>
  `;
};

export const createNodemailerClient = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const send = async (notification: Notification): Promise<void> => {
    console.log("notification", notification);
    const mailOptions = {
      from: process.env.EMAIL,
      to: notification.recipientEmail,
      subject: notification.subject,
      html: createEmailTemplate(notification),
    };
    await transporter.sendMail(mailOptions);
  };

  return { send };
};
