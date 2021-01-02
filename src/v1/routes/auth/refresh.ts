import { Router, Request, Response } from "express";
import { AuthError, NotAuthorizedError } from "../../../errors";
import {
  createAccessToken,
  getTokenData,
  isRefreshToken,
  isToken,
} from "../../../modules/jwt";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { refresh } = req.body;
    const tokenValue = await getTokenData(refresh);
    if (!isToken(tokenValue) || !isRefreshToken(tokenValue)) {
      throw new NotAuthorizedError("Token is not a refresh token");
    }
    const access = await createAccessToken(tokenValue.uid);
    return res.status(200).json({ access });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.send(err.code).json(err.buildErrorResponse());
    }
    return res.status(500).send(new AuthError().buildErrorResponse());
  }
});

export default router;
