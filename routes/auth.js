import { Router } from "express";
import signUpController from "../controllers/auth/signUpController.js"
import loginController from "../controllers/auth/loginController.js"
const router=Router();
router.post("/signup",signUpController);
router.post("/login",loginController);
export default router;