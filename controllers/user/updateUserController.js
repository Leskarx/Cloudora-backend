import user from "../../schema/userSchema.js";

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;

    // copy body
    const updateData = { ...req.body };

    // ❌ Prevent sensitive fields from being updated
    delete updateData?.email;
    delete updateData?.password;
    delete updateData?._id;
    delete updateData?.role; // if you don’t want role tampering

    const updatedUser = await user.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

export default updateUser;
