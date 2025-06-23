document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const clearButton = document.getElementById('clear-all-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => createTaskElement(taskText));
    }

    // Add task from input
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        if (isDuplicateTask(taskText)) {
            alert('Task already exists.');
            return;
        }

        createTaskElement(taskText);
        saveTask(taskText);
        taskInput.value = '';
    }

    // Create task element in DOM
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTask(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    // Get tasks array from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Save a new task
    function saveTask(taskText) {
        const storedTasks = getStoredTasks();
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from storage
    function removeTask(taskText) {
        let storedTasks = getStoredTasks();
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Check for duplicate task
    function isDuplicateTask(taskText) {
        const storedTasks = getStoredTasks();
        return storedTasks.includes(taskText);
    }

    // Clear all tasks
    function clearAllTasks() {
        if (confirm('Are you sure you want to clear all tasks?')) {
            localStorage.removeItem('tasks');
            taskList.innerHTML = '';
        }
    }

    // Event Listeners
    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearAllTasks);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
