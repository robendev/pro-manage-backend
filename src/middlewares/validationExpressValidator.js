import { validationResult } from "express-validator";

import CustomError from "../errors/CustomErrors.js";

const validationResultRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomError("Errores de validación", 400, errors.array()));
  }
  next();
};

export default validationResultRequest;
