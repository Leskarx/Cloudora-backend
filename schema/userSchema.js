import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    profilePic: { type: String },
    location:{ type: String  },
    filesUploaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'file' }],
   },{ timestamps: true });
  
  export default mongoose.model('user',userSchema)