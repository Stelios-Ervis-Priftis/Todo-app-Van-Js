import uuidv4 from 'uuid/v4'
import { log } from './helpers'

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
const createTodo = (text) => {
    const id = uuidv4()
    // todos.push({
    //     id: id,
    //     text: text,
    //     completed: false
    // })
    // saveTodos()

    // let newText = e.target.elements.newText.value.trim()
    if (text.length === 0) {
        const input = document.querySelector('#todo-input')
        input.classList.add('todo-input-error')
        input.classList.remove('animated', 'zoomIn', 'delay-1s')
        input.classList.add('animated', 'shake', 'Slower')
        input.placeholder = 'Add a to do'
    } else {
        todos.push({
            id: id,
            text: text,
            completed: false
        })
        const input = document.querySelector('#todo-input')
        input.classList.remove('todo-input-error')
        input.placeholder = 'Something to do'
        input.classList.remove('animated', 'shake', 'Slower')

        // e.target.elements.newText.value = ''
        saveTodos()
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

// Make sure to call loadTodos and setup the exports
export { getTodos, createTodo, removeTodo, toggleTodo }