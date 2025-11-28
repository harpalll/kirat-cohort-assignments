import express from "express";
import "dotenv/config";
import { userRouter } from "./routes/user.js";
import { todoRouter } from "./routes/todo.js";
import { connectToDatabase } from "./db/index.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

// * User Routes
app.use("/api/v1/users", userRouter);
// * Todo Routes
app.use("/api/v1/todos", todoRouter);

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
