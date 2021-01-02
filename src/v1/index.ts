import { Router } from "express";
import auth from "./routes/auth";
import password from "./routes/profile";

const router = Router();
router.use("/auth", auth);
router.use("/password", password);

export default router;
