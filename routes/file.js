import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import uploadFileController from "../controllers/files/uploadFileController.js";
import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const router=Router();

router.post("/upload",verifyToken,upload.single("file"),uploadFileController)


export default router;