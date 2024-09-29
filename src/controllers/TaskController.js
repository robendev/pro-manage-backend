import Task from "../models/Task.js";
import CustomError from "../errors/CustomErrors.js";

export class TaskController {
  static createTask = async (req, res, next) => {
    const { taskName, taskDescription } = req.body;
    try {
      const task = new Task({
        taskName,
        taskDescription,
        createdBy: req.user._id,
        projectId: req.project._id,
      });
      req.project.tasks.push(task._id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(201).json({ message: "Tarea creada exitosamente." });
    } catch (err) {
      next(err);
    }
  };
  static getAllTasks = async (req, res, next) => {
    try {
      const tasks = req.project.tasks;
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };
  static getTaskById = async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const task = req.project.tasks.find(
        (task) => task._id.toString() === taskId
      );
      if (!task) {
        throw new CustomError(
          "La tarea solicitada no se encuentra disponible.",
          404
        );
      }
      res.json(task);
    } catch (err) {
      next(err);
    }
  };
  static updateTaskById = async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findOne({
        $and: [
          { _id: taskId },
          { projectId: req.project._id },
          { createdBy: req.user._id },
        ],
      });
      if (!task) {
        throw new CustomError(
          "Tarea no encontrada o no pertenece al proyecto",
          404
        );
      }
      Object.assign(task, req.body);
      await task.save();
      res.json({ message: "Tarea actualizada exitosamente." });
    } catch (err) {
      next(err);
    }
  };
  static deleteTaskById = async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findOne({
        $and: [
          { _id: taskId },
          { projectId: req.project._id },
          { createdBy: req.user._id },
        ],
      });
      if (!task) {
        throw new CustomError(
          "Tarea no encontrada o no pertenece al proyecto",
          404
        );
      }
      req.project.tasks = req.project.tasks.filter(
        (task) => task._id.toString() !== taskId
      );
      await Promise.allSettled([req.project.save(), task.deleteOne()]);
      res.json({ message: "Tarea eliminada exitosamente." });
    } catch (err) {
      next(err);
    }
  };
}
