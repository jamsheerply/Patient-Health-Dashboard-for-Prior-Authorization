import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongo.config";
import userRouter from "./routers/user.router";
import patientRouter from "./routers/patient.router";
import authorizationRouter from "./routers/authorization.router";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const isProduction: boolean = process.env.NODE_ENV === "production";

connectDB();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api/user", userRouter);
app.use("/api/patient", patientRouter);
app.use("/api/auth-request", authorizationRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
