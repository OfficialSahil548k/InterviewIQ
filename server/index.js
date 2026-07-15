import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
dotenv.config();


const PORT = process.env.PORT || 6000;

const app = express();



app.listen(PORT, () => { 
    console.log(`server is running on localhost:${PORT}`); 
    connectDb(); 
});

app.get('/', (req, res) => {
    res.send('server is running...');
});
