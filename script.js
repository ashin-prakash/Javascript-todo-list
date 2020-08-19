//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//Functions

function addTodo(event){
    //Prevent form from submiting
  event.preventDefault();
  // TOD div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //ADD todooo to local storahe
  saveLocalTodos(todoInput.value);
  //CHECK MARK button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  //CHECK trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  //APPEND TO List
  todoList.appendChild(todoDiv);
  //Clear TODOINput values
  todoInput.value = '';

}

function deleteCheck(e) {
  const item = e.target;
  //delete todooo
  if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function() {
      todo.remove();
    })
    
  }

  //checkmark
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos =  todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'Completed':
        if (todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
          break;
      case 'InComplete':
        if (!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    }
  });
}

function saveLocalTodos(todo) {
  //Check do i have it
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}