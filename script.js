const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

// Load tasks
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const span = li.querySelector('span');
        tasks.push({
            text: span.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    addTaskToDOM(text);
    taskInput.value = '';
    saveTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

clearBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

loadTasks();
