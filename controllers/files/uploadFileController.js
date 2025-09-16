import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../server.js";
import { v4 as uuidv4 } from "uuid";
import File from "../../schema/fileSchema.js";
import { getUserById } from "../../action/getUserFromId.js";

async function uploadFile(req, res) {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Validate user
    const { id } = req.user || {};
    if (!id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const savedUser = await getUserById(id);
    if (!savedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate unique file key
    const fileKey = `${uuidv4()}-${req.file.originalname}`;

    // Upload params
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    // Upload to S3
    await s3.send(new PutObjectCommand(params));

    // Public file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // Save file metadata in MongoDB
    const file = new File({
      name: req.file.originalname,
      userId: savedUser._id,
      userName: savedUser.name,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      awsFileUrl: fileUrl,
    });

    const savedFile = await file.save();

    // Update user -> push file reference
    savedUser.filesUploaded.push(savedFile._id);
    await savedUser.save();

    // Success response
    return res.status(200).json({
      message: "File uploaded successfully",
      file: savedFile,
      user: savedUser
      
    });

  } catch (error) {
    console.error("S3 Upload Error:", error);

    return res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
}

export default uploadFile;
