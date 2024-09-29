import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      required: true,
      trim: true,
      type: String,
    },
    projectDescription: {
      trim: true,
      type: String,
    },
    createdBy: {
      ref: "User",
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
      default: "low",
      enum: ["low", "medium", "high"],
      type: String,
    },
    collaborators: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    tasks: [
      {
        ref: "Task",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    notes: [
      {
        trim: true,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
