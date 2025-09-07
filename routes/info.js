
import { Router } from "express";

const router =Router()
router.get("/health",(req,res)=>{
res.status(200).json({
    message:"Server is ruinning"
})
})
export default router;