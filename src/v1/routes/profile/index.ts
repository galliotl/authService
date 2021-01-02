import { Router } from "express";

// Routers
import password from "./password";
import me from "./me";
import { verifyToken } from "../../../middlewares";
const router = Router();

router.use("/password", password);
router.use("/me", verifyToken, me);
export default router;
