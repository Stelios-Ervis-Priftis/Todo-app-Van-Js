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
        input.placeholder = 'Add to do'
    } else {
        todos.push({
        id: uuidv4(),
        text: newText,
        completed: false
    })
        const input = document.querySelector('#todo-input')
        input.classList.remove('todo-input-error')
        input.placeholder = 'Something to do'
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
    


    document.querySelector('#todos').innerHTML = ''

    const incomleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').appendChild(generateSummaryDOM(incomleteTodos))

    filteredTodos.forEach((todo) => {
        // const p = document.createElement('p')
        // p.textContent = todo.text
        // const todoEl = generateTodoDOM(todo)
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const checkCompleted = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup the attribute checkbox
    checkCompleted.setAttribute('type', 'checkbox')
    checkCompleted.checked = todo.completed
    todoEl.appendChild(checkCompleted)
    checkCompleted.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup the text content
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup the remove button
    removeButton.textContent = 'x'
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
    summary.textContent = `You have ${incomleteTodos.length} todos left`

    return summary
}