let todos = []; // in memory space
let id = 1;

export async function getAllTodo(req, res, next) {
  res.status(200).json({
    message: "Todos fetched successfully.",
    todos,
  });
}

export async function createTodo(req, res, next) {
  const { title } = req.body;
  todos.push({
    title,
    id,
    completed: false,
  });
  id++;
  res.status(200).json({
    message: "Todo Created Successfully.",
    todos,
  });
}

export async function updateTodo(req, res, next) {
  const id = parseInt(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) return res.status(400).json({ message: "Cannot Find todo" });

  todo.completed = !todo.completed;

  res.status(200).json({
    message: "Todo Updated Successfully.",
    todos,
  });
}

export async function deleteTodo(req, res, next) {
  todos = [];
  res.status(200).json({
    message: "All Todos Deleted Successfully.",
  });
}

export async function deleteTodoById(req, res, next) {
  const id = parseInt(req.params.id);
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  res.status(200).json({
    message: "Todo Deleted Successfully",
    todos,
  });
}

export async function searchTodo(req, res, next) {
  const { searchQuery } = req.body;

  if (!searchQuery || typeof searchQuery !== "string")
    return res.status(400).json({ message: "Invalid search query" });

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredTodos.length === 0) {
    return res.status(404).json({ message: "No matching todos found" });
  }

  res.status(200).json({
    message: "Matching Todos Found",
    results: filteredTodos,
  });
}
