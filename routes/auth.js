import { Router } from "express";
import signUpController from "../controllers/auth/signUpController.js"
import loginController from "../controllers/auth/loginController.js"
import logOutController from "../controllers/auth/logOutController.js";
const router=Router();
router.post("/signup",signUpController);
router.post("/login",loginController);
router.post("/logout",logOutController)

export default router;