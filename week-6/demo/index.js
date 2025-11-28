const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const JWT_SECRET = "somerandom";
const PORT = 3000;
const USERS = [];

// * middlwares
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  if (!token) res.status(403).json({ msg: "Token missing" });

  const decodedToken = jwt.verify(token, JWT_SECRET);

  const decodedUser = USERS.find(
    (user) => user.username === decodedToken.username
  );

  if (!decodedUser) res.status(403).json({ msg: "Invalid Token" });

  req.user = decodedUser;
  next();
};

app.post("/signup", (req, res) => {
  // const reqBody = z
  //   .object({
  //     username: z.string().min(3).max(100),
  //     password: z.string().min(3).max(100),
  //   })
  //   .superRefine(({ password }, checkPassComplexity) => {
  //     const containsUppercase = (ch) => /[A-Z]/.test(ch);
  //     const containsLowercase = (ch) => /[a-z]/.test(ch);
  //     const containsSpecialChar = (ch) =>
  //       /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
  //     let countOfUpperCase = 0,
  //       countOfLowerCase = 0,
  //       countOfNumbers = 0,
  //       countOfSpecialChar = 0;
  //     for (let i = 0; i < password.length; i++) {
  //       let ch = password.charAt(i);
  //       if (!isNaN(+ch)) countOfNumbers++;
  //       else if (containsUppercase(ch)) countOfUpperCase++;
  //       else if (containsLowercase(ch)) countOfLowerCase++;
  //       else if (containsSpecialChar(ch)) countOfSpecialChar++;
  //     }
  //     if (
  //       countOfLowerCase < 1 ||
  //       countOfUpperCase < 1 ||
  //       countOfSpecialChar < 1 ||
  //       countOfNumbers < 1
  //     ) {
  //       checkPassComplexity.addIssue({
  //         code: "custom",
  //         message: "password does not meet complexity requirements",
  //       });
  //     }
  //   });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const reqBody = z.object({
    email: z.string().min(3).max(100).email(),
    username: z.string().min(3).max(100),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
  });
  // const { username, password } = req.body;

  const parsed = reqBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect Data",
      error: parsed.error,
    });
  }

  USERS.push({
    username: parsed.data.username,
    password: parsed.data.password,
  });
  res.status(200).json({
    msg: "user created successfully.",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const foundUser = USERS.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    res.status(400).json({
      msg: "username or password invalid",
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET);

  foundUser.token = token;

  res.status(200).json({
    msg: `Logged in successfully`,
    token,
  });
});

app.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    msg: "Authenticated Successfully.",
    user: req.user,
  });
});

app.listen(PORT || 3000, () => console.log(`server is running on ${PORT}`));
