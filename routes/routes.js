import { Router } from "express";
import infoRouter from "./info.js";
import authRouter from "./auth.js";
import userRouter from "./user.js"
import verifyToken from "../middlewares/verifyToken.js";
import getCurrentUser from "../controllers/user/getCurrentUserController.js";
import fileRouter from "../routes/file.js"
const router =Router();
router.use("/info",infoRouter)
router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/file",fileRouter)
router.get("/me",verifyToken,getCurrentUser)
export default router;