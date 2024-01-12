// Get elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create a new list item
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    const importantButton = document.createElement('button');

    listItem.innerHTML = `<span>${taskText}</span>`;
    listItem.appendChild(deleteButton);
    listItem.appendChild(importantButton);

    deleteButton.textContent = 'Delete';
    importantButton.textContent = 'Important';

    deleteButton.classList.add('delete-btn');
    importantButton.classList.add('important-btn');

    deleteButton.onclick = () => deleteTask(listItem);
    importantButton.onclick = () => toggleImportant(listItem);

    // Add task to the list
    taskList.prepend(listItem);

    // Clear input
    taskInput.value = '';

    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
}

// Delete task function
function deleteTask(listItem) {
  listItem.remove();

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

// Toggle important status function
function toggleImportant(listItem) {
  const span = listItem.querySelector('span');
  span.classList.toggle('completed');

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

// Save tasks to local storage function
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector('span').innerText,
    important: task.querySelector('.important-btn').classList.contains('completed'),
  }));

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage function
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    const importantButton = document.createElement('button');

    listItem.innerHTML = `<span>${task.text}</span>`;
    listItem.appendChild(deleteButton);
    listItem.appendChild(importantButton);

    deleteButton.textContent = 'Delete';
    importantButton.textContent = 'Important';

    deleteButton.classList.add('delete-btn');
    importantButton.classList.add('important-btn');

    deleteButton.onclick = () => deleteTask(listItem);
    importantButton.onclick = () => toggleImportant(listItem);

    if (task.important) {
      listItem.querySelector('span').classList.add('completed');
    }

    taskList.prepend(listItem);
  });
}
