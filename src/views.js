import { getFilters } from './filters'
import { getTodos, removeTodo, saveTodos, toggleTodo } from './todos'
import { log } from './helpers'

// renderTodos
// Render application todos base on the filters
const renderTodos = () => {
    const todos = getTodos()
    const filters = getFilters()

    let filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incomleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incomleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))
        })
    } else {
        const message = document.createElement('p')
        message.textContent = 'No to-dos to show'
        message.classList.add('animated', 'fadeIn', 'delay-2s', 'empty-message')
        document.querySelector('#todos').appendChild(message)
    }
}
// Arguments: none
// Return value: none

// generateTodoDOM
// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkCompleted = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup the attribute checkbox
    checkCompleted.setAttribute('type', 'checkbox')
    checkCompleted.checked = todo.completed
    containerEl.appendChild(checkCompleted)
    checkCompleted.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos()
        renderTodos()
    })

    // Setup the text content
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos()
        renderTodos()
    })

    return todoEl
}
// Arguments: todo
// Return value: the todo element

// generateSummaryDOM
// Get the DOM elements for the list summary
const generateSummaryDOM = (incomleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if (incomleteTodos.length > 1) {
        summary.textContent = `You have ${incomleteTodos.length} todos left.`
    } else {
        summary.textContent = `You have ${incomleteTodos.length} todo left.`
    }

    return summary
}
// Arguments: incompletedTodos
// Return value: the summary element

// Make sure to set up the exports
export { renderTodos }