import user from "../schema/userSchema.js"
export const getUserById=async(userID)=>{
try {
      const savedUser=await user.findById(userID);
      return savedUser
    
} catch (error) {
    return null;
    throw error;
    
}
}