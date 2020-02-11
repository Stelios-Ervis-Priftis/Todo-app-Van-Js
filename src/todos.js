import uuidv4 from 'uuid/v4'

// Setup the empty todos array
const todos = []

// loadTodos
const loadTodos = () => {
    const todosJson = localStorage.getItem('todos')

    try {
        return todosJson ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
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
    e.preventDefault()

    const id = uuidv4()
    // let newText = e.target.elements.newText.value.trim()
    let newText = 'New todo'

    if (newText.length === 0) {
        const input = document.querySelector('#todo-input')
        input.classList.add('todo-input-error')
        input.classList.remove('animated', 'zoomIn', 'delay-1s')
        input.classList.add('animated', 'shake', 'Slower')
        input.placeholder = 'Add a to do'
    } else {
        todos.push({
            id: id,
            text: newText,
            completed: false
        })
        const input = document.querySelector('#todo-input')
        input.classList.remove('todo-input-error')
        input.placeholder = 'Something to do'
        input.classList.remove('animated', 'shake', 'Slower')

        // e.target.elements.newText.value = ''
    }
}
// Arguments: todo text
// Return value: none

// removeTodo
// Arguments: id of todo to remove
// Return value: none

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none

// Make sure to call loadTodos and setup the exports
export { loadTodos, saveTodos, getTodos, createTodo }