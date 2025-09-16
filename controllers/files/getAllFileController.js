// import File from "../../schema/fileSchema";
import User from "../../schema/userSchema.js";

async function getAllFiles(req, res) {
    try {
        const { id } = req.user;
        
        if (!id) {
            return res.status(400).json({
                message: "User ID not found"
            });
        }

        const savedUser = await User.findById(id).populate('filesUploaded');
        
        
        if (!savedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            files: savedUser.filesUploaded
        });
        
    } catch (error) {
        console.error("Error in getAllFile controller->", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export default getAllFiles;