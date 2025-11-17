const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", loadTodos);
form.addEventListener("submit", addTodo);

// --- Local Storage Helpers ---
const STORAGE_KEY = "tasks";
const getTasks = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const setTasks = (tasks) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

// --- Load tasks from storage ---
function loadTodos() {
  const todos = getTasks();
  todoList.innerHTML = "";
  todos.forEach(addTasktoDOM);
}

// --- Add new task ---
function addTodo(event) {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  // Generate unique ID
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : String(Date.now());

  const task = { id, text, completed: false };

  const todos = getTasks();
  todos.push(task);
  setTasks(todos);

  addTasktoDOM(task);

  input.value = "";
  input.focus();
}

// --- Add task element to DOM ---
function addTasktoDOM(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  li.innerHTML = `
    <label class="task-label">
      <input type="checkbox" class="task-checkbox" ${
        task.completed ? "checked" : ""
      }>
      <span class="task-text">${escapeHtml(task.text)}</span>
    </label>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // Set ARIA labels
  li.querySelector(".task-checkbox").setAttribute(
    "aria-label",
    `Complete "${task.text}"`
  );
  li.querySelector(".edit-btn").setAttribute(
    "aria-label",
    `Edit "${task.text}"`
  );
  li.querySelector(".delete-btn").setAttribute(
    "aria-label",
    `Delete "${task.text}"`
  );

  const span = li.querySelector(".task-text");
  const checkbox = li.querySelector(".task-checkbox");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  // Initial styles for completed tasks
  if (task.completed) {
    li.classList.add("completed");
  }

  // Toggle complete
  checkbox.addEventListener("change", () => {
    toggleComplete(task.id, checkbox.checked);
    if (checkbox.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  });
  // Edit task
  editBtn.addEventListener("click", () => {
    const isEditing = editBtn.dataset.mode === "editing";

    if (!isEditing) {
      // BUTTON ACTS AS EDIT
      editBtn.dataset.mode = "editing";
      editBtn.textContent = "Save";

      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      input.classList.add("task-edit-input");

      // Replace span with input
      span.replaceWith(input);
      input.focus();
      input.select();

      const applyEdit = () => {
        const newText = input.value.trim();

        // If empty, revert to original text
        if (!newText) {
          input.replaceWith(span);
          span.textContent = task.text;
        } else {
          // Update DOM
          span.textContent = newText;
          input.replaceWith(span);

          // Update storage
          const todos = getTasks();
          const updated = todos.map((t) =>
            t.id === task.id ? { ...t, text: newText } : t
          );
          setTasks(updated);

          // Update task object
          task.text = newText;
        }

        editBtn.textContent = "Edit";
        editBtn.dataset.mode = "";
      };

      // Save when pressing Enter key
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          applyEdit();
        }
      });

      // Store the applyEdit function for later use
      editBtn._applyEdit = applyEdit;
    } else {
      // BUTTON ACTS AS SAVE
      if (typeof editBtn._applyEdit === "function") {
        editBtn._applyEdit();
      }
    }
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    li.style.animation = "fadeOut 0.18s forwards";

    setTimeout(() => {
      li.remove();
      deleteTask(task.id);
    }, 180);
  });

  todoList.appendChild(li);
}

// -- Toggle task completion ---
function toggleComplete(id, isDone) {
  const updated = getTasks().map((t) =>
    t.id === id ? { ...t, completed: isDone } : t
  );
  setTasks(updated);
}

// --- Delete task ---
function deleteTask(id) {
  const filtered = getTasks().filter((t) => t.id !== id);
  setTasks(filtered);
}

// --- Escape HTML to prevent XSS ---
function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m])
  );
}
