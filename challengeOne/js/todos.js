import utilities from "./utilities.js";
import ls from './ls.js'

// button on click handler
document.querySelector("addBtn").onclick = addNewTodo;
// get input
const input = document.querySelector("#todoInput");
// add todo when enter is pressed
input.addEventListener("keypress", e => {
    if (e.keyCode == "13") addNewTodo();
});

loadTodos();

function addNewTodo(e) {
    // todo: { id : timestamp, content: string, completed: bool }

    // reset input field

    // add to the UI

    // save to local storage

    // load list 

}

function createTodoItem(todo) {
    // to do div (createElement)

    // complete btn

    // todo content

    // delete button

    // append to div

    // return div

}

function addToList(todoDiv) {
    // add to document

}

function loadTodos() {
    // get element with #todos

    // get list from local storage

    // count incomplete items

    // loop through todos and createTodoItem
    // also count incomplete items

    // show items left to do

}

function deleteTodo(e) {
    // get current button

    // delete todo in local storage

    // clear list

    // load list

}

function markComplete(e) {
    // get current button

    // if not marked, mark; else, remove mark

    // mark complete in local storage

    // clear list

    // load list
}

function applyFilter(e) {
    // clear list

    // declare variables
    // filtered list
    // all list

    // check which filter to apply
    // can call function from utilities

    // loop through filtered list
    // and call createTodoItem
}

//todo: {id : 'timestamp'; content: 'todo'; completed: false}