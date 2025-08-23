import express from "express";
import User from "../models/User.js";
import { registerUser, loginUser, logoutUser } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);

router.post("/logout", logoutUser);


// GET /api/users/profile
router.get("/profile", protect, (req, res) => {
  res.json({
    id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
  });
});


export default router;
