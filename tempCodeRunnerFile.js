const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const SALT_ROUNDS = 10;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://brooklynqueens254:lynmalone254@vx.wo0xzhx.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Helper function for error responses
const errorResponse = (res, status, message, error = null) => {
  const response = { success: false, message };
  if (error && process.env.NODE_ENV === 'development') {
    response.error = error.message;
  }
  return res.status(status).json(response);
};

// Signup Route (unchanged from your original)
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, countryCode, phone, city, region, password } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      countryCode,
      phone,
      city,
      region,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.countryCode + newUser.phone,
        city: newUser.city,
        region: newUser.region,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// Signin Route (unchanged from your original)
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email or sign up.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Successful login
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

// Check Email Route (unchanged from your original)
app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "Email not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Email exists" 
    });
  } catch (error) {
    console.error("Email check error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during email check" 
    });
  }
});

// Enhanced Reset Password Route
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
      return errorResponse(res, 400, "Both email and new password are required");
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return errorResponse(res, 400, "Password must be at least 8 characters long");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "No account found with that email address");
    }

    // Check if new password is different from current one
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return errorResponse(res, 400, "New password cannot be the same as your current password");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update user's password and clear any reset tokens
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Password updated successfully. You can now log in with your new password.",
    });

  } catch (error) {
    console.error("Password reset error:", error);
    return errorResponse(res, 500, "An unexpected error occurred. Please try again later.", error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});