import express from "express";
import {getMe, login, signup, logout} from "../controllers/auth.controller"
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router= express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me",protect, getMe);
router.get("/logout", protect, logout)

router.get("/admin-check", protect, adminOnly, (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Admin access granted",
    });
});

export default router;