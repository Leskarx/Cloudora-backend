import mongoose from "mongoose";

    async function connectDb() {
       try{
        console.log("....>",process.env.mongoDbUri);
        
        const connect=await mongoose.connect(process.env.mongoDbUri)
        if(connect!=null){
            console.log("Db is connected");
            
        }
       } catch (error) {
        throw error;
        
    }
        
    }
    

export default connectDb;