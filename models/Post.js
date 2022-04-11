const mongoose = require('mongoose')
const Schema = mongoose.Schema


// create Schema
const postSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


const Post = mongoose.model('Photo', postSchema)

module.exports = Post