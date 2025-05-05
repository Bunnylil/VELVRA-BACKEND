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
  countryCode: { type: String, required: true, default: "254" },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema, 'pagea');


// Helper function for error responses
const errorResponse = (res, status, message, error = null) => {
  const response = { success: false, message };
  if (error && process.env.NODE_ENV === 'development') {
    response.error = error.message;
  }
  return res.status(status).json(response);
};

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, countryCode, phone, city, region, password } =
      req.body;

    // Validate all required fields
    if (!fullName || !email || !phone || !city || !region || !password) {
      return errorResponse(res, 400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      countryCode: countryCode || "254",
      phone,
      city,
      region,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        countryCode: newUser.countryCode,
        city: newUser.city,
        region: newUser.region,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    errorResponse(res, 500, "Server error during signup", error);
  }
});

// Add this schema definition before your routes
const thumbnailSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Thumbnail = mongoose.model('Thumbnail1', thumbnailSchema, 'thumbnail1');

// Add this new route to get all thumbnails
app.get("/api/thumbnails", async (req, res) => {
  try {
    const thumbnails = await Thumbnail.find({});
    res.status(200).json({
      success: true,
      thumbnails
    });
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    errorResponse(res, 500, "Server error while fetching thumbnails", error);
  }
});

// Signin Route
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, 400, "Email and password are required");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found. Please check your email or sign up.");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 401, "Incorrect password. Please try again.");
    }

    // Successful login
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        countryCode: user.countryCode,
        phone: user.phone,
        city: user.city,
        region: user.region,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    errorResponse(res, 500, "Internal server error. Please try again later.", error);
  }
});

// Check Email Route
app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return errorResponse(res, 404, "Email not found");
    }

    res.status(200).json({ 
      success: true, 
      message: "Email exists" 
    });
  } catch (error) {
    console.error("Email check error:", error);
    errorResponse(res, 500, "Server error during email check", error);
  }
});

// Reset Password Route
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
      return errorResponse(res, 400, "Both email and new password are required");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "No account found with that email address");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully!"
    });

  } catch (error) {
    console.error("Password reset error:", error);
    errorResponse(res, 500, "An unexpected error occurred. Please try again later.", error);
  }
});

// Get User Details Route
app.get("/api/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Return user details (excluding password)
    res.status(200).json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        countryCode: user.countryCode,
        phone: user.phone,
        city: user.city,
        region: user.region
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    errorResponse(res, 500, "Server error while fetching user details", error);
  }
});

// Get Products Route
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    errorResponse(res, 500, "Server error while fetching products", error);
  }
});

// Update Address Information Route
app.put("/api/update-address", async (req, res) => {
  try {
    const { email, countryCode, phone, city, region } = req.body;

    // Validate input
    if (!email || !countryCode || !phone || !city || !region) {
      return errorResponse(res, 400, "All fields are required");
    }

    // Find user and update address information
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { 
        countryCode,
        phone,
        city,
        region
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      user: {
        countryCode: updatedUser.countryCode,
        phone: updatedUser.phone,
        city: updatedUser.city,
        region: updatedUser.region
      }
    });
  } catch (error) {
    console.error("Update address error:", error);
    errorResponse(res, 500, "Server error while updating address", error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});