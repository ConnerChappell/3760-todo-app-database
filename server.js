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
        id: req.body._id,
        title: req.body.title,
        complete: false
    })

    newItem.save()
    .then(async () => {
        todos = await Todo.find()
        console.log(todos)
        res.json(todos)
    })

    // todos.push(newItem)
    // res.json(newItem)
})

// PUT
// work in progress...

// DELETE
app.delete('/deleteTodo/:todoId', async (req, res) => {
    console.log(req.params.todoId)
    let todo = await Todo.findByIdAndDelete({ _id: req.params.todoId })
    .then(async () => {
        let todos = await Todo.find()
        res.json(todos)
    })
})