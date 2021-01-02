import { Router, Request, Response } from "express";
import { AuthError } from "../../../errors";
import { createAccessToken, createRefreshToken } from "../../../modules/jwt";
import User from "../../../models/user";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new User();
    user.email = email;
    user.password = password;
    const doc = await user.save();

    const access = await createAccessToken(user._id);
    const refresh = await createRefreshToken(user._id);
    return res.status(201).json({
      access,
      refresh,
      user: doc.toJSON(),
    });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      return res.status(422).json({ message: "Unique constraints violation" });
    }
    if (err instanceof AuthError) {
      return res.status(err.code).json(err.buildErrorResponse());
    }
    return res.status(500).send(new AuthError().buildErrorResponse());
  }
});

export default router;
