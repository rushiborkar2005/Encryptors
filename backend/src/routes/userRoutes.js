import express from "express";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/userControllers.js";


const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);



export default router;
