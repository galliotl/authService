import { Router, Request, Response } from "express";
import {
  AuthError,
  PasswordDontMatchError,
  UserDoesNotExistError,
} from "../../../errors";
import User from "../../../models/user";
import { createAccessToken, createRefreshToken } from "../../../modules/jwt";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Get user from email
    const user = await User.findOne({ email });
    if (!user) throw new UserDoesNotExistError();
    if (!user.comparePassword(password, user.password)) {
      throw new PasswordDontMatchError();
    }
    const access = await createAccessToken(user._id);
    const refresh = await createRefreshToken(user._id);
    return res.status(200).json({
      access,
      refresh,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.code).json(err.buildErrorResponse());
    }
    return res.status(500).send(new AuthError().buildErrorResponse());
  }
});

export default router;
