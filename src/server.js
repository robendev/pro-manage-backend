import "dotenv/config";
import express from "express";
import cors from "cors";

import { corsOptions } from "./config/cors.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Middleware para manejar errores globales
app.use(errorHandler);

export default app;
