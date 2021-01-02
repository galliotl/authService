import { Router, Request, Response } from "express";
import { AuthError } from "../../../errors";
import User from "../../../models/user";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) return res.status(200).send(true);
    return res.status(404).send("user not found");
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.code).json(err.buildErrorResponse());
    }
    return res.status(500).send(new AuthError().buildErrorResponse());
  }
});

export default router;
