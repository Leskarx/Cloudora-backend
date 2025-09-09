// import jwt from "jsonwebtoken"
const logout=(req,res)=>{
    const token=req.cookies.token
if(!token){
    return res.status(400).json({
        message:"token not found"
    })
}

res.clearCookie("token",{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict"
})
return res.status(200).json({
    message:"logout sucessfull"
})
    

}
export default logout;