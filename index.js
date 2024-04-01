let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;
let todoList = JSON.parse(localStorage.getItem("todos")) || [];

/** Function to create unique id */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) {
        var number = Math.random() * 16 | 0;
        var randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}

addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    todo = todoInput.value;
    if(todo.length > 0){
        todoList.push({id: uuid(), todo : todo, isCompleted : false})
    }
    renderTodoList(todoList);
    localStorage.setItem("todos", JSON.stringify(todoList))
    todoInput.value = "";
})

showTodos.addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.dataset.key;
    let deleteTodoKey = e.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted : !todo.isCompleted} : todo)
    todoList = todoList.filter(todo => todo.id !== deleteTodoKey);
    localStorage.setItem("todos", JSON.stringify(todoList))
    renderTodoList(todoList); 
})

function renderTodoList(todoList) {
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => 
    `<div class="todo relative"> <input class="t-checkbox t-pointer" id="item-${id}" data-key=${id} type="checkbox" ${isCompleted ? "checked" : ""} /> 
    <label class="todo t-pointer todo-text ${isCompleted ? "checked-todo" : ""}" for="item-${id}" data-key=${id}>${todo}</label> 
    <button class="absolute right-0 button cursor">
      <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button> </div>`)
}

renderTodoList(todoList)