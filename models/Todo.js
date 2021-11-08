const { model, Schema } = require('mongoose')

const Todo = new Schema({
    id: Number,
    title: String,
    complete: {
        type: Boolean, 
        default: false,
    }
})

module.exports = model("todo", Todo)