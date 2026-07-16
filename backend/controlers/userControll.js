const User = require("../models/userModel");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users }); // list page uses this
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ADD USER
const addUsers = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET USER BY ID ( VERY IMPORTANT FIX)
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); // MUST BE DIRECT OBJECT
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//  UPDATE USER
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
  req.params.id,
  req.body,
  { returnDocument: "after" } // new method
);
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
};
