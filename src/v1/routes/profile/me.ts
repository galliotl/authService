import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  // Get the inferred uid from verifyToken;
  const uid = req.body._uid;
  return res.status(200).json({ uid });
});

export default router;
