import { Router } from "express";
import { body, param } from "express-validator";

import { ProjectController } from "../controllers/ProjectController.js";
import { authenticate } from "../middlewares/validationAuth.js";
import { validateProjectAccessForParams } from "../middlewares/validationProject.js";
import validationResultRequest from "../middlewares/validationExpressValidator.js";

const router = Router();

router.use(authenticate);
router.param("projectId", validateProjectAccessForParams);

router.post(
  "/",
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre del proyecto debe tener al menos 3 caracteres.")
    .matches(/^[a-zA-Z0-9_ .-áéíóúÁÉÍÓÚüÜñÑ]+$/)
    .withMessage(
      "El nombre del proyecto solo puede contener letras, números, espacios, guiones, puntos, guiones bajos y caracteres acentuados."
    ),
  body("projectDescription")
    .trim()
    .notEmpty()
    .withMessage("La descripción del proyecto es obligatoria."),
  body("endDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La fecha de finalización debe ser una fecha válida."),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage(
      "El estado debe ser uno de los siguientes: pending, in-progress, completed."
    ),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage(
      "La prioridad debe ser una de las siguientes: low, medium, high."
    ),
  validationResultRequest,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get(
  "/:projectId",
  param("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId() // usando MongoDB
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."),
  /* .isUUID() // usando UUIDs
    .withMessage("El ID del proyecto debe ser un UUID válido."), */
  validationResultRequest,
  ProjectController.getProjectById
);
router.patch(
  "/:projectId",
  param("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId() // usando MongoDB
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."),
  /* .isUUID() // usando UUIDs
.withMessage("El ID del proyecto debe ser un UUID válido."), */
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre del proyecto debe tener al menos 3 caracteres.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El nombre del proyecto solo puede contener letras, números y guiones bajos."
    ),
  body("projectDescription")
    .trim()
    .notEmpty()
    .withMessage("La descripción del proyecto es obligatoria."),
  body("endDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La fecha de finalización debe ser una fecha válida."),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage(
      "El estado debe ser uno de los siguientes: pending, in-progress, completed."
    ),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage(
      "La prioridad debe ser una de las siguientes: low, medium, high."
    ),
  validationResultRequest,
  ProjectController.updateProjectById
);
router.delete(
  "/:projectId",
  param("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId() // usando MongoDB
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."),
  /* .isUUID() // usando UUIDs
    .withMessage("El ID del proyecto debe ser un UUID válido."), */
  validationResultRequest,
  ProjectController.deleteProjectById
);

export default router;
