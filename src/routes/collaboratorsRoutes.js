import { Router } from "express";
import { body } from "express-validator";

import { authenticate } from "../middlewares/validationAuth.js";
import validationResultRequest from "../middlewares/validationExpressValidator.js";
import { validateProjectAccessForBody } from "../middlewares/validationTask.js";

import { CollaboratorsController } from "../controllers/CollaboratorsController.js";

const router = Router();

router.use(authenticate)

router.post("/find-collaborator",
    body("projectId")
        .trim()
        .notEmpty()
        .withMessage("El ID del proyecto es obligatorio.")
        .isMongoId()
        .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El email es obligatorio.")
        .isEmail()
        .withMessage("Debe ser un email válido.")
        .normalizeEmail(),
    validationResultRequest,
    validateProjectAccessForBody,
    CollaboratorsController.findCollaboratorByEmail);
router.post("/add-collaborator",
    body("projectId")
        .trim()
        .notEmpty()
        .withMessage("El ID del proyecto es obligatorio.")
        .isMongoId()
        .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."),
    body("collaboratorId")
        .trim()
        .notEmpty()
        .withMessage("El ID del colaborador es obligatorio.")
        .isMongoId()
        .withMessage("El ID del colaborador debe ser un ID de MongoDB válido."),
    validationResultRequest,
    validateProjectAccessForBody,
    CollaboratorsController.addCollaboratorById);
router.delete("/remove-collaborator",
    body("projectId")
        .trim()
        .notEmpty()
        .withMessage("El ID del proyecto es obligatorio.")
        .isMongoId()
        .withMessage("El ID del proyecto debe ser un ID de MongoDB válido."),
    body("collaboratorId")
        .trim()
        .notEmpty()
        .withMessage("El ID del colaborador es obligatorio.")
        .isMongoId()
        .withMessage("El ID del colaborador debe ser un ID de MongoDB válido."),
    validationResultRequest,
    validateProjectAccessForBody,
    CollaboratorsController.removeCollaboratorById);

export default router;