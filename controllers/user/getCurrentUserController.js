import user from "../../schema/userSchema.js";

const getCurrentUser=async(req,res)=>{ 
    try {
        const {id,email}=req.user;
        if(!id||!email){
            return res.status(500).json({
                message:"Internal server error"
        })
        }
        const savedUser=await user.findById(id)
        return res.status(200).json({
            message:"user found",
            user:savedUser
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
    })
        
    }

}
export default getCurrentUser;