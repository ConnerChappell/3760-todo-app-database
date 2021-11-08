(function (window) {
    const todoList = document.querySelector('#todoList')
    const userItemInput = document.querySelector('#newItemInput')
    const addItemBtn = document.querySelector('#addItemBtn')

    // Click event listener for adding new todo item
    addItemBtn.addEventListener('click', (event) => {
        let itemToSend = JSON.stringify({
            title: userItemInput.value
        })

        fetch('/addNewTodo', {
            method: 'POST',
            body: itemToSend,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res => res.json())
        .then((data) => {
            displayTodos(data)
        })

        userItemInput.value = ""
    })

    // Click event listener for deleting a todo item
    todoList.addEventListener('click', (event) => {
        let todoId = event.target.parentElement.id

        if (event.target.matches('.delete-item-btn')) {
            // console.log(todoId)
            fetch(`/deleteTodo/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then((res) => res.json())
            .then(() => location.reload())
        }
    })

    // Fetches and displays todos
    fetch('/todos')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach((todo) => displayTodos(todo))
    })

    // Function that displays list of todos
    const displayTodos = function (todo) {
        // Creates li container for each todo item
        const itemDiv = document.createElement('li')
        itemDiv.setAttribute('id', `${todo._id}`)
        itemDiv.classList.add('item-div')

        // Creates input for checkmark and appends to item-div
        const itemCheckmark = document.createElement('input')
        itemCheckmark.classList.add('form-check-input')
        itemCheckmark.type = 'checkbox'
        // itemCheckmark.setAttribute('id', `${todo.id}`)
        itemDiv.appendChild(itemCheckmark)

        // Creates p for todo item and appends to item-div
        const item = document.createElement('p')
        item.appendChild(document.createTextNode(`${todo.title}`))
        item.classList.add('todo-item')
        itemDiv.appendChild(item)

        // Creates edit task input
        const editTaskInput = document.createElement('input')
        editTaskInput.classList.add('form-control', 'edit-user-task-input')
        editTaskInput.type = 'text'
        editTaskInput.value = todo.title

        // Creates edit button and appends to item-div
        const itemEditBtn = document.createElement('button')
        itemEditBtn.textContent = 'Edit'
        itemEditBtn.classList.add('edit-item-btn', 'btn', 'btn-light')
        itemDiv.appendChild(itemEditBtn)

        // Creates save button
        const itemSaveBtn = document.createElement('button')
        itemSaveBtn.innerHTML = '<span>Save</span>'
        itemSaveBtn.classList.add('btn', 'btn-light')

        // Creates delete button and appends to item-div
        const itemDeleteBtn = document.createElement('button')
        itemDeleteBtn.textContent = 'Delete'
        itemDeleteBtn.classList.add('delete-item-btn', 'btn', 'btn-danger')
        itemDiv.appendChild(itemDeleteBtn)

        // Append itemDiv to todoList
        todoList.appendChild(itemDiv)
    }

})(window)