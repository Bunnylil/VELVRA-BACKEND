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
  .connect("mongodb+srv://brooklynqueens254:lynmalone254@vx.wo0xzhx.mongodb.net/velvra", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===== Schemas and Models =====

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

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});
const Newsletter = mongoose.model("Newsletter", newsletterSchema, "newsletter");

// Product Schema (Unisex)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  sizes: {
    male: { type: Number },
    female: { type: Number },
    kids: { type: Number },
  },
  colors: [String],
  createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", productSchema, "page1");

// Discounta Schema
const discountaSchema = new mongoose.Schema({
  brand: String,
  price: Number,
  name: String,
  description: String,
  colors: [String],
  sizes: {
    male: [Number],
    female: [Number],
    kids: [Number],
  },
  videos: {
    red: String,
    black: String,
    blue: String,
  },
});
const Discounta = mongoose.model("Discounta", discountaSchema);

// Thumbnail Schema
const thumbnailSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});
const Thumbnail = mongoose.model("Thumbnail1", thumbnailSchema, "thumbnail1");

// MenProduct Schema
const menProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  model: String,
  brand: String,
  price: Number,
  image: String,
  gender: [String],
  sport: [String],
  color: String,
  colors: [String],
  sizes: [Number],
  rating: Number,
  trending: Boolean,
  new: Boolean,
  videosets: Object,
  details: [String],
});
const MenProduct = mongoose.model("MenProduct", menProductSchema);

// ===== Helper for Error Response =====
const errorResponse = (res, status, message, error = null) => {
  const response = { success: false, message };
  if (error && process.env.NODE_ENV === "development") {
    response.error = error.message;
  }
  return res.status(status).json(response);
};

// ===== Routes =====

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, countryCode, phone, city, region, password } = req.body;
    if (!fullName || !email || !phone || !city || !region || !password) {
      return errorResponse(res, 400, "All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, 400, "Email already in use");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({ fullName, email, countryCode: countryCode || "254", phone, city, region, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { fullName, email, phone, countryCode, city, region },
    });
  } catch (error) {
    console.error("Signup error:", error);
    errorResponse(res, 500, "Server error during signup", error);
  }
});

// Signin
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return errorResponse(res, 400, "Email and password are required");
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, 401, "Incorrect password");
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email, countryCode: user.countryCode, phone: user.phone, city: user.city, region: user.region },
    });
  } catch (error) {
    errorResponse(res, 500, "Internal server error", error);
  }
});

// Check Email
app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return errorResponse(res, 400, "Email is required");
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "Email not found");
    res.status(200).json({ success: true, message: "Email exists" });
  } catch (error) {
    errorResponse(res, 500, "Error during email check", error);
  }
});

// Reset Password
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return errorResponse(res, 400, "Both fields required");
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "No account found");
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    errorResponse(res, 500, "Error resetting password", error);
  }
});

// Get User
app.get("/api/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "User not found");
    res.status(200).json({
      success: true,
      user: { fullName: user.fullName, email: user.email, countryCode: user.countryCode, phone: user.phone, city: user.city, region: user.region },
    });
  } catch (error) {
    errorResponse(res, 500, "Error fetching user", error);
  }
});

// Update Address
app.put("/api/update-address", async (req, res) => {
  try {
    const { email, countryCode, phone, city, region } = req.body;
    if (!email || !countryCode || !phone || !city || !region) return errorResponse(res, 400, "All fields are required");
    const updatedUser = await User.findOneAndUpdate({ email }, { countryCode, phone, city, region }, { new: true });
    if (!updatedUser) return errorResponse(res, 404, "User not found");
    res.status(200).json({ success: true, message: "Address updated", user: updatedUser });
  } catch (error) {
    errorResponse(res, 500, "Error updating address", error);
  }
});

// Newsletter Signup
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return errorResponse(res, 400, "Email is required");
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(409).json({ success: false, message: "Already signed up" });
    await new Newsletter({ email }).save();
    res.status(201).json({ success: true, message: "Thank you for signing up!" });
  } catch (error) {
    errorResponse(res, 500, "Newsletter signup failed", error);
  }
});

// Product Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    errorResponse(res, 500, "Error fetching products", error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return errorResponse(res, 404, "Product not found");
    res.status(200).json({ success: true, product });
  } catch (error) {
    errorResponse(res, 500, "Error fetching product", error);
  }
});

app.get("/api/discounta", async (req, res) => {
  try {
    const product = await Discounta.findOne();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/products/discounta/:id", async (req, res) => {
  try {
    const updatedProduct = await Discounta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return errorResponse(res, 404, "Discount product not found");
    res.status(200).json({ success: true, message: "Updated", product: updatedProduct });
  } catch (error) {
    errorResponse(res, 500, "Error updating discount product", error);
  }
});

// Thumbnails
app.get("/api/thumbnails", async (req, res) => {
  try {
    const thumbnails = await Thumbnail.find({});
    res.status(200).json({ success: true, thumbnails });
  } catch (error) {
    errorResponse(res, 500, "Error fetching thumbnails", error);
  }
});

// MenProduct with filters
app.get("/api/men/products", async (req, res) => {
  try {
    const products = await MenProduct.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/men/products/filter", async (req, res) => {
  try {
    const filters = req.query;
    let query = {};
    if (filters.genders) query.gender = { $in: filters.genders.split(',') };
    if (filters.sports) query.sport = { $in: filters.sports.split(',') };
    if (filters.colors) query.color = { $in: filters.colors.split(',') };
    if (filters.brands) query.brand = { $in: filters.brands.split(',') };
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }
    let sortOption = {};
    switch (filters.sort) {
      case "price-low-high": sortOption.price = 1; break;
      case "price-high-low": sortOption.price = -1; break;
      case "trending": query.trending = true; break;
      case "bestsellers": query.rating = { $gt: 4.5 }; break;
      case "top-rated": sortOption.rating = -1; break;
      case "newest": query.new = true; break;
    }
    const products = await MenProduct.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
