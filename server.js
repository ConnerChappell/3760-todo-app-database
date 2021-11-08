const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use(express.static('public'))

let todos = [
    {
        id: 1,
        title: 'Clean',
        complete: false,
    },
    {
        id: 2,
        title: 'Homework',
        complete: false,
    }
]

// GET
app.get('/todos', (req, res) => {
    res.json(todos)
})

// POST
app.post('/addNewTodo', (req, res) => {
    let newItem = {
        id: todos.length + 1,
        title: req.body.title,
        complete: false
    }

    todos.push(newItem)
    res.json(newItem)
})

// DELETE
app.delete('/deleteTodo/:todoId', (req, res) => {
    const { todoId } = req.params
    todos.splice(todoId - 1, 1)
    res.send(todos)
})


app.listen(PORT, () => {
    console.log(`Server is happy and running on http://localhost:${PORT}`)
})