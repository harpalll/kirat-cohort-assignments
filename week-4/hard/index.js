const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

// * user routes
const userRouter = require("./routes/user");
app.use("/user", userRouter);

// * todo routes
const todoRouter = require("./routes/todo");
app.use("/todo", todoRouter);

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
