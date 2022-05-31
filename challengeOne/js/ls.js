const TODO_LIST = 'todoList';

function getTodoList() {
    // get list from local storage

    // declare list

    // if list exists, parse it

    // return list

}

function saveTodo(todo) {
    // get list by calling getTodoList

    // push todo variable passed in

    // stringify list and save to local storage

}

function deleteTodo(id) {
    // get list by calling getTodoList

    // filter out item to delete (use id)

    // stringify list and save to local storage

}

function markComplete(id) {
    // get list by calling getTodoList

    // loop through list and mark complete if id 

    // return todo

}

export default {
    getTodoList,
    saveTodo,
    deleteTodo,
    markComplete
}