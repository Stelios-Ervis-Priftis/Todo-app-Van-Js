'use strict'

// Fetch existing todos from the localstorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    
    try {
        return todosJSON ? JSON.parse(todosJSON) : []   
    } catch (error) {
        return []
    }
    
    // if (todosJSON !== null) {
    //     return JSON.parse(todosJSON)
    // } else {
    //     return []
    // }
}

// Save todos to localstorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))    
}

// Remove a todo from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id
    })

    if (todo) {
        todo.completed = !todo.completed
    }
}

// Push todo object into the todos array
const pushTodo = (e) => {
    e.preventDefault()

    let newText = e.target.elements.newText.value.trim()

    if (newText.length === 0) {
        const input = document.querySelector('#todo-input')
        input.classList.add('todo-input-error')
        input.classList.remove('animated', 'zoomIn', 'delay-1s')
        input.classList.add('animated', 'shake', 'Slower')
        input.placeholder = 'Add a to do'
    } else {
        todos.push({
        id: uuidv4(),
        text: newText,
        completed: false
    })
        const input = document.querySelector('#todo-input')
        input.classList.remove('todo-input-error')
        input.placeholder = 'Something to do'
        input.classList.remove('animated', 'shake', 'Slower')

        e.target.elements.newText.value = ''
    }
}

// Render application todos base on the filters
const renderTodos = (todos, filters) => {
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
        saveTodos(todos)
        renderTodos(todos, filters)
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
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

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