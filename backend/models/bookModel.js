const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    format: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: false
    },
    review: {
        type: String,
        required: false
    },
    notes: {
        type: [String],
        required: false
    },
    isOwned: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    // order: {
    //     type: Number,
    //     required: true
    // },
    link: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Book', bookSchema)