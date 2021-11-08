const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { mongoURI } = require('./config')
const Todo = require('./models/Todo')
const app = express()

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected Successfully')
    app.listen(8000, () => {
        console.log('Server is running and happy on port 8000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use(express.static('public'))

// let todos = [
//     {
//         id: 1,
//         title: 'Clean',
//         complete: false,
//     },
//     {
//         id: 2,
//         title: 'Homework',
//         complete: false,
//     }
// ]

// GET
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    console.log(todos)
    res.json(todos)
})

// POST
app.post('/addNewTodo', async (req, res) => {
    let todos = await Todo.find()

    const newItem = new Todo({
        id: todos.length + 1,
        title: req.body.title,
        complete: false
    })

    newItem.save()
    .then(async () => {
        todos = await Todo.find()
        console.log(todos)
        console.log(newItem.title)
        res.json(todos)
    })

    // todos.push(newItem)
    // res.json(newItem)
})

// DELETE
app.delete('/deleteTodo/:todoId', (req, res) => {
    const { todoId } = req.params
    todos.splice(todoId - 1, 1)
    res.send(todos)
})