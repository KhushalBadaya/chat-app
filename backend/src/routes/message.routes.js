import express from "express";

const router = express.Router();
router.get("/sendmessage",(req,res)=>{
    res.send("Sendmessgae EndPoint");
});
export default router;