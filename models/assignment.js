const { mongoose, Schema } = require("mongoose");

const assignment_schema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "AdminId is required"],
    },
    task: {
      type: String,
      required: [true, "Task is required"],
    },
    file: {
      type: String,
      required: [true, "File is required"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

exports.Assignment = mongoose.model("Assignment", assignment_schema);
