const { Assignment } = require("../models/assignment");
const { User } = require("../models/user");

// Controller to register a new admin
exports.register_admin = async (req, res, next) => {
  const { name = "", email = "", password = "" } = req.body;

  try {
    // Check if an admin with the same email already exists
    const user_exists = await User.findOne({ email });
    if (user_exists) return res.status(409).json({ message: "Admin already exists" });

    const user = await User.create({ name, email, password, role: "admin" });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Controller to handle admin login
exports.login_admin = async (req, res, next) => {
  try {
    console.log(req.user);
    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller to retrieve assignments for admin review
exports.get_assignments = async (req, res, next) => {
  let { page = 0, limit = 10, task = "", status = "" } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;
  let offset = page * limit;

  // Define search criteria based on the query
  let criteria = {};
  if (task) criteria.task = { $regex: task, $options: "i" };
  if (status) criteria.status = { $in: status.split(",") };
  // Get the logged-in admin's ID
  criteria.admin_id = req.user.id;

  try {
    const response = await Assignment.find(criteria)
      .limit(limit * 1)
      .skip(offset)
      .exec();

    // Count total assignments that match criteria
    const count = await Assignment.find(criteria).countDocuments();

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

// Controller to accept an assignment
exports.accept_assignment = async (req, res, next) => {
  const { id: assignment_id } = req.params;

  try {
    const response = await Assignment.findOneAndUpdate({_id: assignment_id,},{ status: "accepted" });
    if (!response) return res.status(404).json({ message: "Assignment not found" });

    return res.status(200).json({ message: "Assignment accepted" });
  } catch (error) {
    next(error);
  }
};

// Controller to reject an assignment
exports.reject_assignment = async (req, res, next) => {
  const { id: assignment_id } = req.params;

  try {
    const response = await Assignment.findOneAndUpdate({_id: assignment_id,},{ status: "rejected" });
    if (!response) return res.status(404).json({ message: "Assignment not found" });

    return res.status(200).json({ message: "Assignment rejected" });
  } catch (error) {
    next(error);
  }
};
