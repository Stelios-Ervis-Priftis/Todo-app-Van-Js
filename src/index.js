// Set up index.html to load the bundle
log('index.js running')
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { log, doc } from './helpers'
import { getTodos, createTodo } from './todos'
import { setFilters } from './filters'
import { renderTodos } from './views'


// Render initial todos
renderTodos()

// Set up search text handler
doc.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
doc.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
doc.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    createTodo(e)
    renderTodos()
})

log(getTodos())


// Bonus: Add a watcher for local storage