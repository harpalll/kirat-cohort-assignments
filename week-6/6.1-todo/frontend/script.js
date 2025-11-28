const API_URL = "http://localhost:3001/todos";

// Fetch existing todos when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchTodos();
});

// Fetch todos from backend
function fetchTodos() {
  document.getElementById("todo-list").innerHTML = "";

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        addTodoToDOM(todo);
      });
    })
    .catch((error) => console.error("Error fetching todos:", error));
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
  const todoList = document.getElementById("todo-list");
  let clutter = `
    <li class='todo-item ${
      todo.completed ? "completed" : ""
    }' onclick='toggleTodo(${todo.id})'>
        <span>${todo.title}</span>
        <button class='delete-btn' onclick="deleteTodo(${
          todo.id
        })">Delete</button>
    </li>
  `;

  todoList.innerHTML += clutter;
}

// Add a new todo
document.getElementById("add-todo-btn").addEventListener("click", async () => {
  const titleInput = document.getElementById("todo-input");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: titleInput.value }),
  });

  const data = await response.json();
  if (data) {
    alert("Todo Created Successfully");
    titleInput.value = "";
    titleInput.blur();
    fetchTodos();
  } else {
    alert("Error");
  }
});

// Toggle todo completion
async function toggleTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data) {
    alert("Todo Completed Successfully");
    fetchTodos();
  } else {
    alert("Error");
  }
}

// Delete a todo
async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await response.json();
  if (data) {
    alert("Todo Deleted Successfully");
    fetchTodos();
  } else {
    alert("Error");
  }
}

// Delete All todos
async function deleteAll() {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data) {
    alert("All Todos Deleted Successfully");
    fetchTodos();
  } else {
    alert("Error");
  }
}
