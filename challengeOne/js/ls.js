const TODO_LIST = 'todoList';

function getTodoList() {
    // get data from local storage
    let todoListString = localStorage.getItem(TODO_LIST);
    // declare list
    let todoList = [];
    // if list exists, parse it
    if (todoListString) {
        todoList = JSON.parse(todoListString)
    }
    // return list
    return todoList;
}

function saveTodo(todo) {
    // get list by calling getTodoList
    let todoList = getTodoList();
    // push todo variable passed in
    todoList.push(todo);
    // stringify list and save to local storage
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
}

function deleteTodo(id) {
    // get list by calling getTodoList
    const todoList = getTodoList();
    // filter out item to delete (use id)
    let updatedList = todoList.filter( todo => todo.id != id );
    // stringify list and save to local storage
    localStorage.setItem(TODO_LIST, JSON.stringify(updatedList));
}

function markComplete(id) {
    // get list by calling getTodoList
    const todoList = getTodoList();
    // loop through list and mark complete if id 
    let updatedList = todoList.map( todo => { 
        if (todo.id == id) {
            if (todo.completed == false) {
                todo.completed = true;
            } else {
                todo.completed = false;
            }        
            return todo;
        } else {
            return todo;
        }
    });
    // save updated list to local storage
    localStorage.setItem(TODO_LIST, JSON.stringify(updatedList));
}

export default {
    getTodoList,
    saveTodo,
    deleteTodo,
    markComplete
}