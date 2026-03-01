import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
dotenv.config();
const app = express();

const __dirname = path.resolve();
const PORT= process.env.PORT || 3000

app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);


// made for development 
if ( process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"../fronent/dist")));

    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../fronend","dist","index.html"));
    });
}

app.listen(PORT,()=>console.log("Sever is running on port : "+ PORT));