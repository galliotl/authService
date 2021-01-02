import { encodeBase64 } from "bcryptjs";
import { Router, Request, Response } from "express";
import { sendMail } from "../../../modules/email";
import { createPasswordResetToken } from "../../../modules/jwt";

const router = Router();

router.post("/reset/send", async (req: Request, res: Response) => {
  const { email } = req.body;

  // Create the token
  const token = await createPasswordResetToken();

  // Base 64 encode the token

  sendMail({
    recipients: [email],
    subject: "Reset your password",
    text:
      "Hi, you asked to reset your password, here's the code you'll need to provide us",
  });
});

router.post("/reset/send", async (req: Request, res: Response) => {
  const { email } = req.body;

  // Create the token
  const token = await createPasswordResetToken();

  // Base 64 encode the token

  sendMail({
    recipients: [email],
    subject: "Reset your password",
    text:
      "Hi, you asked to reset your password, here's the code you'll need to provide us",
  });
});

export default router;
