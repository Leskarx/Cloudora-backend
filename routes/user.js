import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import updateUserController from "../controllers/user/updateUserController.js";
const router=Router();

router.post("/updateUser",verifyToken,updateUserController)


export default router;