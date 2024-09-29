import Project from "../models/Project.js";
import CustomError from "../errors/CustomErrors.js";

export const validateProjectAccessForQuery = async (req, res, next) => {
  const { projectId } = req.query;
  try {
    const project = await Project.findOne({
      $and: [{ createdBy: req.user._id }, { _id: projectId }],
    }).populate("tasks");
    if (!project) {
      throw new CustomError(
        "Proyecto no encontrado o no pertenece al usuario",
        404
      );
    }
    req.project = project;
    next();
  } catch (err) {
    next(err);
  }
};
export const validateProjectAccessForBody = async (req, res, next) => {
  const { projectId } = req.body;
  try {
    const project = await Project.findOne({
      $and: [{ createdBy: req.user._id }, { _id: projectId }],
    }).populate("tasks");
    if (!project) {
      throw new CustomError(
        "Proyecto no encontrado o no pertenece al usuario",
        404
      );
    }
    req.project = project;
    next();
  } catch (err) {
    next(err);
  }
};
