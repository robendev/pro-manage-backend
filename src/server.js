import "dotenv/config";
import express from "express";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
