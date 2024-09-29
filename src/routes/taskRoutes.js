import { Router } from "express";
import { TaskController } from "../controllers/TaskController.js";
import { authenticate } from "../middlewares/validationAuth.js";
import {
  validateProjectAccessForBody,
  validateProjectAccessForQuery,
} from "../middlewares/validationTask.js";

const router = Router();

router.use(authenticate);

router.post("/", validateProjectAccessForBody, TaskController.createTask);
router.get("/", validateProjectAccessForQuery, TaskController.getAllTasks);
router.get(
  "/:taskId",
  validateProjectAccessForQuery,
  TaskController.getTaskById
);
router.patch(
  "/:taskId",
  validateProjectAccessForBody,
  TaskController.updateTaskById
);
router.delete(
  "/:taskId",
  validateProjectAccessForBody,
  TaskController.deleteTaskById
);

export default router;
