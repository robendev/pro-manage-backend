import { Router } from "express";
import { body, param, query } from "express-validator";

import { TaskController } from "../controllers/TaskController.js";
import { authenticate } from "../middlewares/validationAuth.js";
import {
  validateProjectAccessForBody,
  validateProjectAccessForQuery,
} from "../middlewares/validationTask.js";
import validationResultRequest from "../middlewares/validationExpressValidator.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  body("taskName")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la tarea es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre de la tarea debe tener al menos 3 caracteres.")
    .matches(/^[a-zA-Z0-9_ .áéíóúÁÉÍÓÚüÜñÑ-]+$/)
    .withMessage(
      "El nombre de la tarea solo puede contener letras, números, espacios, guiones, puntos, guiones bajos y caracteres acentuados."
    ),
  body("taskDescription")
    .trim()
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria."),
  body("startDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida."),
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
  body("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId()
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID del proyecto debe ser un UUID válido.'), // usando UUIDs
  validationResultRequest,
  validateProjectAccessForBody,
  TaskController.createTask
);
router.get(
  "/",
  query("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId()
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID del proyecto debe ser un UUID válido.'), // usando UUIDs
  validationResultRequest,
  validateProjectAccessForQuery,
  TaskController.getAllTasks
);
router.get(
  "/:taskId",
  query("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId()
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID del proyecto debe ser un UUID válido.'), // usando UUIDs
  param("taskId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la tarea es obligatorio.")
    .isMongoId()
    .withMessage("El ID de la tarea debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID de la tarea debe ser un UUID válido.'), // usando UUIDs
  validationResultRequest,
  validateProjectAccessForQuery,
  TaskController.getTaskById
);
router.patch(
  "/:taskId",
  param("taskId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la tarea es obligatorio.")
    .isMongoId()
    .withMessage("El ID de la tarea debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID de la tarea debe ser un UUID válido.'), // usando UUIDs
  body("taskName")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la tarea es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre de la tarea debe tener al menos 3 caracteres.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El nombre de la tarea solo puede contener letras, números y guiones bajos."
    ),
  body("taskDescription")
    .trim()
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria."),
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
  body("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId()
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID del proyecto debe ser un UUID válido.'), // usando UUIDs
  validationResultRequest,
  validateProjectAccessForBody,
  TaskController.updateTaskById
);
router.delete(
  "/:taskId",
  param("taskId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la tarea es obligatorio.")
    .isMongoId()
    .withMessage("El ID de la tarea debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID de la tarea debe ser un UUID válido.'), // usando UUIDs
  body("projectId")
    .trim()
    .notEmpty()
    .withMessage("El ID del proyecto es obligatorio.")
    .isMongoId()
    .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."), // usando MongoDB
  // .isUUID().withMessage('El ID del proyecto debe ser un UUID válido.'), // usando UUIDs
  validationResultRequest,
  validateProjectAccessForBody,
  TaskController.deleteTaskById
);

export default router;
