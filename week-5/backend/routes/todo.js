import { Router } from "express";
import { Todo } from "../db/index.js";
import { authenticateJwt } from "../middleware/user.js";

const router = Router();
router.use(authenticateJwt);

router.post("/", async (req, res) => {
  const createPayload = req.body;

  if (!createPayload.title) {
    return res.status(400).json({
      msg: "You sent the wrong inputs",
    });
  }

  try {
    const newTodo = await Todo.create({
      title: createPayload.title,
      completed: false,
      userId: req.userId,
    });

    res.status(201).json({
      msg: "Todo created",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error creating todo",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    if (todos) {
      res.status(200).json({
        msg: "Todos fetched successfully",
        todos,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching todos",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatePayload = req.body;

  if (typeof updatePayload.completed === "undefined") {
    return res.status(400).json({
      msg: "You must provide a completed status.",
    });
  }

  try {
    const todo = await Todo.updateOne(
      {
        _id: id,
      },
      {
        completed: updatePayload.completed,
      }
    );
    res.status(200).json({
      msg: "Todo marked as completed.",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error updating todo.",
      error: error.message,
    });
  }
});

export { router as todoRouter };
