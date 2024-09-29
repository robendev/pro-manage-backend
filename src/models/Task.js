import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      required: true,
      trim: true,
      type: String,
    },
    taskDescription: {
      trim: true,
      type: String,
    },
    createdBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    projectId: {
      ref: "Project",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: {
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
      type: String,
    },
    priority: {
      default: "medium",
      enum: ["low", "medium", "high"],
      type: String,
    },
    assignedTo: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
