const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo, User } = require("../database");
const router = Router();

// todo Routes
router.post("/", adminMiddleware, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  const { title, desc, deadline } = req.body;

  if (title?.trim() && deadline?.trim()) {
    const todo = await Todo.create({
      title,
      desc,
      deadline,
    });

    if (!todo) {
      res.status(500).json({
        msg: "err in creating todo.",
      });
    }

    user.todos.push(todo._id);
    await user.save();

    res.status(200).json({
      msg: `Todo Created successfully.`,
      todo,
    });
  } else {
    res.status(400).json({
      msg: "title and deadline is required.",
    });
  }
});

router.put("/:todoId", adminMiddleware, async (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.todoId;
  const user = await User.findById(userId);

  const { title, desc, deadline } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      title,
      desc,
      deadline,
    },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    return res.status(404).json({ msg: "Error in updating todo" });
  }

  res.status(200).json({
    msg: "Todo Updated Successfully",
    updatedTodo,
  });
});

router.delete("/", adminMiddleware, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  await Todo.deleteMany({ _id: { $in: user.todos } });

  user.todos = [];
  await user.save();

  res.status(200).json({ msg: `All todos deleted for ${user.email}.` });
});

router.delete("/:id", adminMiddleware, async (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const deletedTodo = await Todo.findByIdAndDelete(todoId);
  if (!deletedTodo) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  user.todos = user.todos.filter((todo) => todo.toString() !== todoId);
  await user.save();

  res.status(200).json({ msg: `Todo deleted successfully`, deletedTodo });
});

router.get("/", adminMiddleware, async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const todos = user.todos;
  if (!todos)
    return res.status(404).json({ msg: "Error while fetching the todos" });

  res.status(200).json({
    msg: "Todos fetched Successfully",
    todos,
  });
});

router.get("/:id", adminMiddleware, async (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const todo = await Todo.findById(todoId);
  if (!todo)
    return res.status(404).json({ msg: "Error while fetching the todo" });

  res.status(200).json({
    msg: "Todo fetched Successfully",
    todo,
  });
});

module.exports = router;
