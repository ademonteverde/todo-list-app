# To-Do List App

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Last Commit](https://img.shields.io/github/last-commit/ademonteverde/todo-list-app)
![Repo Size](https://img.shields.io/github/repo-size/ademonteverde/todo-list-app)
![Built with](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JS-blue)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)
![Deploy](https://img.shields.io/badge/Live-GitHub%20Pages-1877F2)


A clean, responsive **To-Do List** web app built entirely with HTML, CSS, and JavaScript.  
You can add, edit, complete, and delete tasks — with smooth animations and automatic saving using `localStorage`.

---

## 🔗 Live Demo

**Try it here:** [https://ademonteverde.github.io/todo-list-app/](https://ademonteverde.github.io/todo-list-app/)

---

## ✨ Features

### Core Functionality
- Add tasks instantly  
- Edit tasks (Edit → Save)  
- Press **Enter** to save edits  
- Mark tasks as complete  
- Delete tasks  
- Automatically saved with `localStorage`

### UI / UX 
- Smooth fade-in animation on add  
- Subtle fade-out on delete  
- Completed tasks get green styling + strikethrough  
- Full mobile-responsive layout  
- Centered container with a modern blue palette  
- Clean spacing, rounded corners, and subtle borders

---

## 🧰 Tech Stack

| Tool                 | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| **HTML5**            | Page structure and layout                       |
| **CSS3**             | Styling and responsive design                   |
| **JavaScript (ES6)** | App logic, editing, DOM updates, `localStorage` |

---

## 📁 Folder Structure

```
todo-list-app/
├── index.html   # Main HTML file
├── style.css    # Styling, animations, UI layout
└── script.js    # App logic (add, edit, complete, delete)
```

---

## ⚙️ How It Works

1. **Add Tasks**  
   Type in the input and press **Add** — tasks fade in smoothly.


2. **Complete Tasks**
- Click **Edit** → field becomes editable  
- Update the text  
- Click **Save** or press **Enter**

### 3. Complete Tasks  
Checkbox toggles:  
- Turns the task **green**  
- Applies strikethrough text  
- Saved to storage

4. **Delete Tasks**  
Tasks fade out and are removed cleanly.

5. **Persistent Storage**  
   All tasks are stored in `localStorage` so they stay even after closing or refreshing the page.

---

## 🧠 Core Functions

| Function           | Description                                 |
| ------------------ | ------------------------------------------- |
| `addTodo()`        | Handles form submission and adds a new task |
| `addTasktoDOM()`   | Creates and displays each task              |
| `startEditTask()`  | (New) Handles Edit → Save logic             |
| `toggleComplete()` | Updates completion status in localStorage   |
| `deleteTask()`     | Removes a task by its unique `id`           |
| `loadTodos()`      | Loads tasks when the page opens             |

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ademonteverde/todo-list-app.git
   ```
2. **Navigate to the project folder**
   ```bash
   cd todo-list-app
   ```
3. **Open it in your browser**
   - Double-click `index.html` or drag it into your browser window.

---

## 🔧 Future Improvements
- Task filters (All / Active / Completed)  
- Clear completed  
- Optional due dates  
- Dark mode  
- Import / export tasks  
- Drag-and-drop reordering  

---

## 🪪 License

This project is licensed under the **MIT License**.  
You’re free to use, modify, and share it.

---

## 👤 Author

**Andre Carlo Demonteverde**  
GitHub: https://github.com/ademonteverde
