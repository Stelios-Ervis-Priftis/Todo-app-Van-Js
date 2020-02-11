// Set up index.html to load the bundle
log('index.js running')
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { log, doc } from './helpers'
import { getTodos, createTodo, removeTodo, toggleTodo } from './todos'
import { getFilters, setFilters } from './filters'

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage