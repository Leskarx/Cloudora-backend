import bcrypt from "bcrypt"
import user from "../../schema/userSchema.js"
import jwt from "jsonwebtoken"


const login=async (req, res) => {
   try {
     const{email,password}=req.body
     if(!email || !password){
         return res.status(400).json({
             message:"all fields are required"
         })
     }
    //  find the saved user
     const savedUser=await user.findOne({
         email:email
     })
     if(!savedUser){
         return res.status(404).json({
             message:"user not found"
         })
     }
    // verify password 
     const verify= await bcrypt.compare(password,savedUser.password)
     if(!verify){
         return res.status(401).json({
             message: "Invalid credentials"
         });

     }

    //  no error occured
    const token=jwt.sign(
        {id:savedUser._id,email:savedUser.email},
        process.env.JWT_SECRETE,

    );
    
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:120*60*60*1000 
    });
    

    



     return res.status(201).json({
        message:"Login successful"

     })
   } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
        message: "Internal server error",
        error: error.message
    });
    
   }
    




}
export default login;