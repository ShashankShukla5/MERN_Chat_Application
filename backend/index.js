import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from './src/routes/auth.route.js';
import messageRoutes from './src/routes/message.route.js';

import { connectDB } from './src/lib/db.js';
import { app, server } from './src/lib/socket.js';

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit: '10mb'}))
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
    connectDB()
})