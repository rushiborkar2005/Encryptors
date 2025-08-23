import express from "express";
import User from "../models/UserData.js";
import { setIncome, addExpense, getUserData } from "../controllers/userDataController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.post("/income", protect, setIncome);
router.post("/expense", protect, addExpense);
router.get("/", protect, getUserData);

export default router;
