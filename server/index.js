import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { 
    console.log(`server is running on localhost:${PORT}`); 
    connectDb(); 
});