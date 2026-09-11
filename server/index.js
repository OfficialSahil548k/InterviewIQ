import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
dotenv.config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview",interviewRouter);
app.use("/api/payment",paymentRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
    connectDb();
});
