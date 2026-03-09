import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDB } from "./lib/db.js";
const app = express();

const __dirname = path.resolve();
const PORT= process.env.PORT || 3000

app.use(express.json());//req.body
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// made for development 
if ( process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../fronend","dist","index.html"));
    });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
});