import jwt from "jsonwebtoken";

import CustomError from "../errors/CustomErrors.js";

export const authenticate = (req, res, next) => {
  const authBearer = req.header("Authorization");
  if (!authBearer || !authBearer.startsWith("Bearer ")) {
    throw new CustomError("Acceso no autorizado", 401);
  }
  const tokenJwt = authBearer.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(tokenJwt, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(new CustomError("Token inválido o expirado", 401));
  }
};
