import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { ENV } from "../lib/env.js";
    export const protectedRoute = async(req,res,next)=>{
        try{
            const token = res.cokkies.jwt;
            if(!token) res.status(401).json({message:"Unatuorized no token provided"})
            
            const decoded= jwt.verify(token,ENV.JWT_SECRET);
            if(!decoded) res.status(401).json({message:"Unatuorized Invalid token"})
                
            const user = await User.findById(decoded.userId).select("-password");
            if(!user) res.status(401).json({message:"User not found"})
            
            req.user=user;
            next();    
        }catch(error){
            console.error("Error in protectedRoute middelware",error);
            res.status(500).json({message:"Interna server error"});
        }
    };