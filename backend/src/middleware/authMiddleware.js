// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // 1. Check Cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. Fallback: Check Bearer token in Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };
