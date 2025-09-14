import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    userName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    awsFileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
