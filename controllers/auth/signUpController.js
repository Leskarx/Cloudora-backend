// import mongoose from "mongoose";
import user from "../../schema/userSchema.js"
import bcrypt from "bcrypt"
async function signUp(req,res) {
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        return res.status(400).json({
            message:"Name,email and password are required"
        })}

    try {
        const salt=await bcrypt.genSalt(5);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new user({
            name,
            email,
           password:hashedPassword
        })
        await newUser.save();
        return res.status(201).json({
            message:"User created successfully",
            user:newUser
        })
      
        
        
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                message:"Email already exists"
            })
        }
        return res.status(500).json({
            message:"Internal server error",
            error:error.message
        })

        
        
    }


    
}
export default signUp;