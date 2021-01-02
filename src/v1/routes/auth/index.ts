import { Router } from "express";

// Routers
import exists from "./exists";
import login from "./login";
import refresh from "./refresh";
import register from "./register";

const router = Router();

router.use("/exists", exists);
router.use("/refresh", refresh);
router.use("/register", register);
router.use("/login", login);

export default router;
