import { Router } from "express";

import { AuthController } from "../controllers/AuthController.js";

const router = Router();

router.post("/create-account", AuthController.createAccount);
router.post("/confirm-account", AuthController.confirmAccount);
router.post("/login-account", AuthController.loginAccount);
router.post("/request-token", AuthController.requestNewOtpToken6Digits); // ? Solicitud para un nuevo token de confirmación
router.post("/recover-account", AuthController.recoverAccount); // ? Solicitud para recuperar la cuenta, crea un nuevo token
router.post("/validate-token", AuthController.validateOtpTokenForPasswordReset); // ? Solicitud para validar la existencia del token ( para recuperar la cuenta )
router.post("/reset-password/:otpToken6Digits", AuthController.resetPassword);

export default router;
