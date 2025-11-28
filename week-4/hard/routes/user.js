const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../database/index");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400).json({
      msg: `User with ${email} already exists.`,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    res.status(500).json({
      msg: "Error in creating user.",
    });
  }

  res.status(200).json({
    msg: "User Created Successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email?.trim() && password?.trim()) {
    const user = await User.findOne({ email, password });

    if (!user) {
      res.status(404).json({
        msg: `Email or Password incorrect`,
      });
    }

    const isPasswordCorrect = password === user.password;

    if (!isPasswordCorrect) {
      res.status(400).json({
        msg: `Email or Password incorrect.`,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      "secret123"
    );

    // res.setHeader("authToken", token);
    res.cookie("authToken", token, { maxAge: 900000, httpOnly: true });

    res.status(200).json({
      msg: `${user.name} logged in successfully.`,
      token,
    });
  } else {
    res.status(400).json({
      msg: "Please provide email and password",
    });
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  const user = req.user;
  const populatedUser = await User.findById(user.id).populate("todos");

  if (!populatedUser) {
    return res.status(404).json({ msg: "User not found." });
  }

  res.json({
    msg: `Todos fetched successfully for ${user.email}`,
    todos: populatedUser.todos,
  });
});

router.post("/logout", userMiddleware, (req, res) => {
  const user = req.user;

  res.clearCookie("authToken");
  res.status(200).json({
    msg: `${user.email} logged out successfully.`,
  });
});

module.exports = router;
