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
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS origin not allowed"));
        }
    },
    credentials: true,
}));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "InterviewIQ API is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
    connectDb();
});
