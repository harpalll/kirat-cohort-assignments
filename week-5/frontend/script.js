let isSigningUp = false;
let isAddingTodo = false;

document.addEventListener("DOMContentLoaded", () => {
  // * user already logged in
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("todo-container").style.display = "block";
  }

  // * signup
  document
    .getElementById("signup-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      if (isSigningUp) return;
      isSigningUp = true;

      const data = {};
      const formData = new FormData(e.target).entries().forEach((element) => {
        data[element[0]] = element[1];
      });

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();
        isSigningUp = false;

        if (response.ok) {
          document.getElementById("response-message").innerText =
            result.message || "Signup successful, please sign in";
          document.getElementById("signup-container").style.display = "none";
          document.getElementById("signin-container").style.display = "block";
        } else {
          document.getElementById("response-message").innerText =
            result.message || "Signup failed";
        }
      } catch (error) {
        isSigningUp = false;
        document.getElementById("response-message").innerText =
          "Error during signup";
      }
    });

  // * signin
  document
    .getElementById("signin-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log(e.target);

      const data = {};
      const formData = new FormData(e.target).entries().forEach((element) => {
        data[element[0]] = element[1];
      });

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();
        isSigningUp = false;

        if (response.ok) {
          localStorage.setItem("token", result.token);
          document.getElementById("signin-container").style.display = "none";
          document.getElementById("todo-container").style.display = "block";
          document.getElementById(
            "response-message"
          ).innerHTML = `Logged in successfully. <a href="#" id="logout-link">Logout</a>`;
          loadTodos();

          document
            .getElementById("logout-link")
            .addEventListener("click", (e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              document.getElementById("todo-container").style.display = "none";
              document.getElementById("signin-container").style.display =
                "block";
              document.getElementById("response-message").innerText = "";
            });
        } else {
          document.getElementById("response-message").innerText =
            result.message || "Signin failed";
        }
      } catch (error) {
        document.getElementById("response-message").innerText =
          "Error during signin";
      }
    });

  // * TOOD CRUD
  document.getElementById("todo-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isAddingTodo) return;
    isAddingTodo = true;

    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();
    if (!todoText) {
      isAddingTodo = false;
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: todoText }),
      });

      const result = await response.json();
      isAddingTodo = false;

      if (response.ok) {
        document.getElementById("response-message").innerText =
          result.message || "Todo Added successfully";
        todoInput.value = "";
        loadTodos();
      } else {
        document.getElementById("response-message").innerText =
          result.message || "Error in adding todo";
        console.error(result.msg);
      }
    } catch (error) {
      isAddingTodo = false;
      console.error("Error adding todo:", error);
      document.getElementById("response-message").innerText =
        "Error adding todo";
    }
  });

  const loadTodos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/v1/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { todos } = await response.json();
      const todoList = document.getElementById("todo-list");
      todoList.innerHTML = "";

      todos.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo.title;

        if (todo.completed) {
          li.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => {
          completeTodo(todo._id, !todo.completed);
        };

        if (!todo.completed) {
          li.appendChild(completeButton);
        }

        todoList.appendChild(li);
      });
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  // *  Complete Todo
  async function completeTodo(id, completed) {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });
      loadTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  }

  // * Toggle between Signup and Signin
  document.getElementById("show-signin").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("signin-container").style.display = "block";
  });

  document.getElementById("show-signup").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signin-container").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
  });
});
