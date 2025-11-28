import { Router } from "express";
import { User } from "../db/index.js";
import jwt from "jsonwebtoken";
const router = Router();
import { SECRET } from "../middleware/user.js";

router.post("/signup", async (req, res) => {
  const { signupUsername, signupPassword } = req.body;
  try {
    if (signupUsername?.trim() && signupPassword?.trim()) {
      const user = await User.findOne({ username: signupUsername });
      if (user) {
        return res.status(403).json({ message: "User already exists" });
      }

      const newUser = new User({
        username: signupUsername,
        password: signupPassword,
      });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "User created successfully", token });
    } else {
      res.status(400).json({
        message: "Please provide username and password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.post("/login", async (req, res) => {
  const { signinUsername, signinPassword } = req.body;

  try {
    const user = await User.findOne({
      username: signinUsername,
      password: signinPassword,
    });
    if (user) {
      const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
});

export { router as userRouter };
