let editingTask = null;

function addTask() {
  const input = document.getElementById("tf-input").value;

  if (!input.trim()) {
    alert("Harap masukkan tugas.");
    return;
  }

  if (editingTask) {
    editingTask.querySelector(".task-text").textContent = input;
    resetEditState();
    return;
  }

  const taskContainer = document.getElementById("task-container");
  const task = document.createElement("li");
  task.classList.add("list-item");
  task.id = "task-" + new Date().valueOf();

  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = input;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", () => {
    editTask(task, input);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  });

  task.appendChild(taskText);
  task.appendChild(editButton);
  task.appendChild(deleteButton);

  taskContainer.appendChild(task);

  document.getElementById("tf-input").value = "";
}

function deleteTask(id) {
  const task = document.getElementById(id);
  task.remove();
}

function editTask(task, oldText) {
  editingTask = task;
  document.getElementById("tf-input").value = oldText;
  document
    .getElementById("tf-input")
    .setAttribute("placeholder", "Edit a task");
  document.getElementById("task-button").textContent = "Edit";
  document.getElementById("task-button").removeEventListener("click", addTask);
  document.getElementById("task-button").addEventListener("click", confirmEdit);
}

function confirmEdit() {
  const input = document.getElementById("tf-input").value;
  if (!input.trim()) {
    alert("Harap masukkan tugas.");
    return;
  }

  editingTask.querySelector(".task-text").textContent = input;
  resetEditState();
}

function resetEditState() {
  editingTask = null;
  document.getElementById("tf-input").value = "";
  document
    .getElementById("tf-input")
    .setAttribute("placeholder", "Masukkan tugas");
  document.getElementById("task-button").textContent = "Add Task";
  document
    .getElementById("task-button")
    .removeEventListener("click", confirmEdit);
  document.getElementById("task-button").addEventListener("click", addTask);
}
