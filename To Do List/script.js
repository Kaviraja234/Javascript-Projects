document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const itemsLeftSpan = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterButtons = document.querySelectorAll('.filter-btn');
  
    let tasks = [];
  
    // Load tasks from localStorage if available
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      renderTasks();
    }
  
    // Add a new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = '';
        saveTasks();
        renderTasks();
      }
    });
  
    // Mark task as completed or uncompleted
    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('task-text')) {
        const taskIndex = e.target.dataset.index;
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
      }
    });
  
    // Delete a task
    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const taskIndex = e.target.dataset.index;
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
      }
    });
  
    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', () => {
      tasks = tasks.filter(task => !task.completed);
      saveTasks();
      renderTasks();
    });
  
    // Filter tasks
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderTasks();
      });
    });
  
    // Render tasks based on the selected filter
    function renderTasks() {
      const filter = document.querySelector('.filter-btn.active').dataset.filter;
      let filteredTasks = tasks;
  
      if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
      } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
      }
  
      todoList.innerHTML = '';
      filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="task-text ${task.completed ? 'completed' : ''}" data-index="${index}">${task.text}</span>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(li);
      });
  
      updateItemsLeft();
    }
  
    // Update the "items left" counter
    function updateItemsLeft() {
      const itemsLeft = tasks.filter(task => !task.completed).length;
      itemsLeftSpan.textContent = `${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`;
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });