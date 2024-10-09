import { Router } from "express";
import { param, body } from "express-validator";

import { AuthController } from "../controllers/AuthController.js";

import validationResultRequest from "../middlewares/validationExpressValidator.js";
import CustomError from "../errors/CustomErrors.js";
import { authenticate } from "../middlewares/validationAuth.js";

const router = Router();

router.post(
  "/create-account",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números y guiones bajos."
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres.")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula.")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula.")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número.")
    .matches(/[@$!%*?&#]/)
    .withMessage(
      "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)."
    ),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("La confirmación de la contraseña es obligatoria.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new CustomError("Las contraseñas no coinciden.", 400);
      }
      return true;
    }),
  validationResultRequest,
  AuthController.createAccount
);
router.post(
  "/confirm-account",
  body("otpToken6Digits")
    .trim()
    .notEmpty()
    .withMessage("El token de 6 dígitos es obligatorio.")
    .isLength({ min: 6, max: 6 })
    .withMessage("El token debe tener exactamente 6 dígitos.")
    .isNumeric()
    .withMessage("El token debe contener solo números."),
  validationResultRequest,
  AuthController.confirmAccount
);
router.post(
  "/login-account",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria."),
  validationResultRequest,
  AuthController.loginAccount
);
router.post(
  "/request-token",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido.")
    .normalizeEmail(),
  validationResultRequest,
  AuthController.requestNewOtpToken6Digits
); // ? Solicitud para un nuevo token de confirmación
router.post(
  "/recover-account",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido.")
    .normalizeEmail(),
  validationResultRequest,
  AuthController.recoverAccount
); // ? Solicitud para recuperar la cuenta, crea un nuevo token
router.post(
  "/validate-token",
  body("otpToken6Digits")
    .trim()
    .notEmpty()
    .withMessage("El token de 6 dígitos es obligatorio.")
    .isLength({ min: 6, max: 6 })
    .withMessage("El token debe tener exactamente 6 dígitos.")
    .isNumeric()
    .withMessage("El token debe contener solo números."),
  validationResultRequest,
  AuthController.validateOtpTokenForPasswordReset
); // ? Solicitud para validar la existencia del token ( para recuperar la cuenta )
router.post(
  "/reset-password/:otpToken6Digits",
  param("otpToken6Digits")
    .trim()
    .notEmpty()
    .withMessage("El token de 6 dígitos es obligatorio.")
    .isLength({ min: 6, max: 6 })
    .withMessage("El token debe tener exactamente 6 dígitos.")
    .isNumeric()
    .withMessage("El token debe contener solo números."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres.")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula.")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula.")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número.")
    .matches(/[@$!%*?&#]/)
    .withMessage(
      "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)."
    ),
    body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("La confirmación de la contraseña es obligatoria.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new CustomError("Las contraseñas no coinciden.", 400);
      }
      return true;
    }),
  validationResultRequest,
  AuthController.resetPassword
);
router.get("/validate-user",
  authenticate,
  AuthController.validateUser
)

export default router;
