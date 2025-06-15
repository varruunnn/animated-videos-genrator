const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({ message: "Logged out successfully" });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password -__v");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
