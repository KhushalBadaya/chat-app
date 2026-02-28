import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
dotenv.config();
const app = express();

const PORT= process.env.PORT || 3000

app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);
app.listen(PORT,()=>console.log("Sever is running on port : "+ PORT));