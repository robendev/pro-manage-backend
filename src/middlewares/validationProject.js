import Project from "../models/Project.js";
import CustomError from "../errors/CustomErrors.js";

export const validateProjectAccessForParams = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({
      $and: [{ createdBy: req.user._id }, { _id: projectId }],
    }).populate({
      path: "tasks",
      select: "_id taskName taskDescription startDate endDate priority status assignedTo tags createdBy createdAt"
    });
    if (!project) {
      throw new CustomError("Proyecto no encontrado.", 404);
    }
    req.project = project;
    next();
  } catch (err) {
    next(err);
  }
};