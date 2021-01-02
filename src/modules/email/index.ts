import nodemailer from "nodemailer";
import { MailOption } from "./types";

export const sendMail = (mailOption: MailOption): Promise<true> => {
  return new Promise((res, rej) => {
    const { recipients, subject, text } = mailOption;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "yourpassword",
      },
    });

    const mailOptions = {
      from: "youremail@gmail.com",
      to: recipients.join(","),
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        rej(error);
      } else {
        res(true);
      }
    });
  });
};
