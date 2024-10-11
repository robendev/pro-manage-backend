import jwt from "jsonwebtoken";

import CustomError from "../errors/CustomErrors.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const authBearer = req.header("Authorization");
  if (!authBearer || !authBearer.startsWith("Bearer ")) {
    throw new CustomError("Acceso no autorizado", 401);
  }
  const tokenJwt = authBearer.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(tokenJwt, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id).select("_id username email");
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404)
    }
    req.user = user;
    next();
  } catch (err) {
    next(new CustomError("Token inválido o expirado", 401));
  }
};
