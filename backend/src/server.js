import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";  
import userRoutes from "./routes/userRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();      // Load .env variables
connectDB();          // Connect to MongoDB

const app = express();

// ✅ Enable CORS (allow frontend to send/receive cookies)
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL (React/Vite)
  credentials: true                 // allow cookies
}));

// ✅ Middleware
app.use(express.json());      // parse JSON body
app.use(cookieParser());      // parse cookies

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/usersdata", userDataRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
