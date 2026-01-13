// import User from "../../models/User.js";
// import asyncHandler from "../../utils/asyncHandler.js";

// // Get all users
// export const getAllUsers = asyncHandler(async (req, res) => {
//   const users = await User.find().select("-password");
//   res.status(200).json(users);
// });

// // Update user
// export const updateUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     req.body,
//     { new: true }
//   ).select("-password");

//   res.status(200).json(updatedUser);
// });


import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// Update user
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.blocked !== undefined) {
    user.blocked = req.body.blocked;
  }

  if (req.body.isAdmin !== undefined) {
    user.isAdmin = req.body.isAdmin;
  }

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});
