import express from "express";
import { signup ,login,logout} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { updateProfile } from "../controller/auth.controller.js";
const router = express.Router();

router.use(arcjetProtection);

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile",protectedRoute,updateProfile);

router.get("/check",protectedRoute,(req,res)=>res.status(201).json(req.user));
export default router;