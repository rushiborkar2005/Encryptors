import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// @desc    Register a new user
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, confirmPassword } = req.body;

    console.log("Incoming Data:", req.body);

    // 1️⃣ Validate required fields
    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3️⃣ Password length validation
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 4️⃣ Check if user already exists (email or phone)
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email or phone" });
    }

    // 5️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create user
    const user = new User({
      firstname: firstName, // match schema
      lastname: lastName,
      phone,
      email,
      password: hashedPassword,
    });

    await user.save();

    // 7️⃣ Exclude password from response
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({ message: "User registered successfully", user: userData });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc    Login a user
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    //  Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    //  Set cookie (secure way)
    res.cookie("token", token, {
      httpOnly: true,          // cannot be accessed by JS
      secure: process.env.NODE_ENV === "production", // true only on HTTPS
      sameSite: "strict",      // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    //  Return response (exclude password)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

