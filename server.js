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
app.post('/todos', (req, res) => {
    let newItem = {
        id: todos.length + 1,
        title: req.body.title,
        complete: false
    }

    todos.push(newItem)
    res.json(newItem)
})

// DELETE
// app.delete('/todos/:todoId', (req, res) => {
//     const { todoId } = req.params
//     const index = todos.findIndex((obj) => obj.id === todoId)
//     todos.splice(index, 1)
// })


app.listen(PORT, () => {
    console.log(`Server is happy and running on http://localhost:${PORT}`)
})