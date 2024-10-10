const mongoose = require("mongoose");
const { Assignment } = require("../models/assignment");
const { User } = require("../models/user");

// Controller to register a new user
exports.register_user = async (req, res, next) => {
  const { name = "", email = "", password = "" } = req.body;

  try {
    // Check if a user with the same email already exists
    const user_exists = await User.findOne({ email });
    if (user_exists) return res.status(409).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role: "user" });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Controller to handle user login
exports.login_user = async (req, res, next) => {
  try {
    console.log(req.user);
    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller for users to upload assignments
exports.upload_assignment = async (req, res, next) => {
  const { admin_id = "", task = "" } = req.body;
  let user_id = "";
  if (req.user) user_id = req.user._id; // Get the logged-in user's ID

  try {
    // Validate the format of the `admin_id`
    if (!mongoose.Types.ObjectId.isValid(admin_id)) {
      return res.status(400).json({ message: "Invalid Admin ID format" });
    }

    // Check if the specified admin exists and has the 'admin' role
    const admin = await User.findById({ _id: admin_id });
    if (!admin || (admin && admin.role !== "admin"))
      return res.status(404).json({ message: "Admin not found" });

    // Ensure a file is provided for the assignment
    if (!req.file) return res.status(400).json({ message: "File assignment is required" });

    const response = await Assignment.create({
      user_id,
      admin_id,
      task,
      file: req.file.path, // Store the file path in the assignment document
    });
    return res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

// Controller to retrieve a list of admins
exports.get_admins = async (req, res, next) => {
  let { page = 0, limit = 10, name = "" } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;
  let offset = page * limit;

  // Define search criteria for admins
  let criteria = {};
  if (name) criteria.name = { $regex: name, $options: "i" };
  criteria.role = "admin";

  try {
    const response = await User.find(criteria)
      .limit(limit * 1)
      .skip(offset)
      .exec();

    // Count total admins that match the criteria
    const count = await User.find(criteria).countDocuments();

    res.status(200).send({
      total: count,
      total_page: Math.ceil(count / limit),
      current_page: page,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
