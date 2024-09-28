import "dotenv/config";
import express from "express";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

export default app;
