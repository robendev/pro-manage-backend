import { Router } from "express";

import { ProjectController } from "../controllers/ProjectController.js";
import { authenticate } from "../middlewares/validationAuth.js";
import { validateProjectAccessForParams } from "../middlewares/validationProject.js";

const router = Router();

router.use(authenticate);
router.param("projectId", validateProjectAccessForParams);

router.post("/", ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:projectId", ProjectController.getProjectById);
router.patch("/:projectId", ProjectController.updateProjectById);
router.delete("/:projectId", ProjectController.deleteProjectById);

export default router;
