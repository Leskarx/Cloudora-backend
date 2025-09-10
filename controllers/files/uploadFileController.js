
async function uploadFile(req,res) {
    try {  
        console.log(req.file);
        return res.status(200).json({
            message:"file uploaded"
        })

        
    } catch (error) {
        return res.status(500).json({
            message:"file upload fail"
        })
        
    }

    
}
export default uploadFile;