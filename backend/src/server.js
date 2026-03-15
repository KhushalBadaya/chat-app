import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";



const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json({limit:"15mb"})); //req.bodymb
app.use(cors({ 
  origin: [
    "https://chat-app-eight-sand-31.vercel.app",
    "https://chat-mm5z488hf-khushalbadayas-projects.vercel.app",
    /\.vercel\.app$/  // allows all vercel preview URLs
  ], 
  credentials: true 
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// made for development
if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
});
