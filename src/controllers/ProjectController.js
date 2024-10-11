import Project from "../models/Project.js";

export class ProjectController {
  static createProject = async (req, res, next) => {
    try {
      const project = new Project(
        req.body
      );
      project.createdBy = req.user._id;
      await project.save();
      res.status(201).json({ message: "Proyecto creado exitosamente." });
    } catch (err) {
      next(err);
    }
  };
  static getAllProjects = async (req, res, next) => {
    try {
      const projects = await Project.find({
        $and: [{ createdBy: req.user._id }],
      });
      res.json(projects);
    } catch (err) {
      next(err);
    }
  };
  static getProjectById = async (req, res, next) => {
    try {
      res.json(req.project);
    } catch (err) {
      next(err);
    }
  };
  static updateProjectById = async (req, res, next) => {
    try {
      Object.assign(req.project, req.body);
      await req.project.save();
      res.json({ message: "Proyecto actualizado exitosamente." });
    } catch (err) {
      next(err);
    }
  };
  static deleteProjectById = async (req, res, next) => {
    try {
      await req.project.deleteOne();
      res.json({ message: "Proyecto eliminado exitosamente." });
    } catch (err) {
      next(err);
    }
  };
}
