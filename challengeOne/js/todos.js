import utilities from "./utilities.js";
import ls from './ls.js'


// button on click handler
document.querySelector("#addBtn").onclick = addNewTodo;
// get input
const input = document.querySelector("#todoInput");
// add todo when 'enter' is pressed
input.addEventListener("keypress", e => {
    if (e.keyCode == "13") addNewTodo();
});  

// filter button listeners
document.querySelector("#allFilter").onclick = applyFilter;
document.querySelector("#activeFilter").onclick = applyFilter;
document.querySelector("#completedFilter").onclick = applyFilter;

loadTodos();    

function addNewTodo(e) {
    // todo: { id : timestamp, content: string, dd: bool }
    const todo = { id: Date.now(), content: input.value, completed: false };
    // reset input field
    input.value = '';
    // add to the UI
    const todoItem = createTodoItem(todo);
    // save to localStorage
    ls.saveTodo(todo);
    // load list
    loadTodos();
}

function createTodoItem(todo) {
    // to do div (createElement), add to class 'todo'
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create complete btn, set data-id attribute, add class
    const completeBtn = document.createElement('button');
    completeBtn.setAttribute('data-id', todo.id);
    completeBtn.classList.add('complete-btn')
    // onclick to mark complete 
    completeBtn.onclick = markComplete;
    if (todo.completed == true) {
        completeBtn.innerHTML = "\&#10004";
        completeBtn.style.padding = '2.5px 4.5px';
    }

    // create todo content div, innerText, add class 
    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');
    //add if complete, line through
    if (todo.completed == true) {
        todoContent.style.textDecoration = 'line-through';
    }

    // create delete button, set data-id atrribute, add class, innerText
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.classList.add('todo-delete-btn');
    deleteBtn.innerText = 'X';
    // onclick to delete todo
    deleteBtn.onclick = deleteTodo;

    // append to todoDiv
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);
    // return div
    return todoDiv;
}

function addToList(todoDiv) {
    // add todoDiv to document
    document.querySelector("#todos").appendChild(todoDiv);
}

function loadTodos() {
    // clear element with #todos
    document.querySelector('#todos').innerHTML = '';
    // get list from local storage
    const todoList = ls.getTodoList();
    // declare variable for incomplete items
    let itemsLeft = 0;
    // loop through todos and createTodoItem
    // and add each item to list
    // also count incomplete items
    todoList.forEach(todo => {
        const el = createTodoItem(todo)
        addToList(el);
        if (todo.completed == false) { // also check how many are incomplete
            itemsLeft += 1;
        }
    })
    // show items left to do
    document.querySelector("#itemsLeft").innerText = `${itemsLeft} tasks left`;
}

function deleteTodo(e) {
    // get current button
    const btn = e.currentTarget;
    // delete todo in local storage
    ls.deleteTodo(btn.getAttribute("data-id"));
    // clear list
    document.querySelector("#todos").innerHTML = '';
    // load list
    loadTodos();
}

function markComplete(e) {
    // get current button
    const btn = e.currentTarget;
    // if not marked, mark; else, remove mark
    if (btn.innerHTML == '') {
        btn.innerHTML = "\&#10004";
    } else {
        btn.innerHTML = '';
    }    
    // mark complete in local storage
    ls.markComplete(btn.getAttribute("data-id"));
    // clear list
    document.querySelector("#todos").innerHTML = '';
    // load list
    loadTodos();
}

function applyFilter(e) {
    // clear list
    document.querySelector("#todos").innerHTML = '';
    // declare variables
    let filteredTodos = [];
    const allTodos = ls.getTodoList();
    // check which filter to apply
    // call function from utilities
    if (e.currentTarget.id == 'activeFilter') {
        filteredTodos = utilities.activeFilter(allTodos);
    } else if (e.currentTarget.id == 'completedFilter') {
        filteredTodos = utilities.completedFilter(allTodos);        
    } else if (e.currentTarget.id == 'allFilter') {
        filteredTodos = allTodos;
    }
    // loop through filtered list
    // and call createTodoItem
    filteredTodos.forEach( todo => {
        const el = createTodoItem(todo);
        addToList(el);
    })
}




