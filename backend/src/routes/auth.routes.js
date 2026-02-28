import express from "express";

const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("Signup EndPoint");
});


router.get("/login",(req,res)=>{
    res.send("login EndPoint");
});

router.get("/logout",(req,res)=>{
    res.send("logout EndPoint");
});

export default router;