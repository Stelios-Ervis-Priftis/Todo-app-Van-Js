// Set up index.html to load the bundle
log('index.js running')
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { log, doc } from './helpers'
import { loadTodos, saveTodos, getTodos, createTodo } from './todos'
import { getFilters, setFilters } from './filters'



// document.querySelector('#new-todo').addEventListener('submit', (e) => {
//     createTodo(e)
//     saveTodos()
// })


// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage