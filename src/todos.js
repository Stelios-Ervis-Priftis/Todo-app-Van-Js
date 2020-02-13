import uuidv4 from 'uuid/v4'
import { log, animateCSS } from './helpers'

const input = document.querySelector('#todo-input')
animateCSS(input, 'zoomIn', 'delay-1s')


// Setup the empty todos array
let todos = []

// loadTodos
const loadTodos = () => {
    const todosJson = localStorage.getItem('todos')

    try {
        todos = todosJson ? JSON.parse(todosJson) : []
    } catch (error) {
        todos = []
    }
}
// Arguments: none
// Return value: none

// saveTodos
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))    
}
// Arguments: none
// Return value: none

// getTodos
const getTodos = () => todos
// Arguments: none
// Return value: todos array

// createTodo
const createTodo = (e) => {
    const id = uuidv4()
    let newTodo = e.target.elements.newText.value.trim()

    if (newTodo.length > 0) {
        todos.push({
            id: id,
            text: newTodo,
            completed: false
        })
        const input = document.querySelector('#todo-input')
        input.classList.remove('todo-input-error')
        input.placeholder = 'Something to do'
        // input.classList.remove('animated', 'shake', 'Slower')

        e.target.elements.newText.value = ''
        saveTodos()
    } else {
        const input = document.querySelector('#todo-input')
        input.classList.add('todo-input-error')
        animateCSS(input, 'shake', 'Slower')
        input.placeholder = 'Add a to do'
    }
}
// Arguments: todo text
// Return value: none

// removeTodo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}
// Arguments: id of todo to remove
// Return value: none

// toggleTodo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id
    })

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}
// Arguments: id of todo to toggle
// Return value: none

loadTodos()
log(loadTodos())

// Make sure to call loadTodos and setup the exports
export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }