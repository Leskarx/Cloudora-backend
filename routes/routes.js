import { Router } from "express";
import infoRouter from "./info.js";
import authRouter from "./auth.js"
import verifyToken from "../middlewares/verifyToken.js";
import getCurrentUser from "../controllers/user/getCurrentUserController.js";
const router =Router();
router.use("/info",infoRouter)
router.use("/auth",authRouter)
router.get("/me",verifyToken,getCurrentUser)
export default router;