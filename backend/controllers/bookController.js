const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all Books
const getBooks = async (req, res) => {

    const user_id = req.user._id

    const books = await Book.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(books)
}

// get a single Book
const getBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such book' })
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).json({ error: 'No such book' })
    }

    res.status(200).json(book)
}

// create new Book
const createBook = async (req, res) => {
    const { title, author, cover, format, tags, description, review, notes, category, status, link } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (!format) {
        emptyFields.push('format')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields ', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const book = await Book.create({ title, author, cover, format, tags, description, review, notes, category, status, link, user_id })
        res.status(200).json(book)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete a Book
const deleteBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such book' })
    }

    const book = await Book.findOneAndDelete({ _id: id })

    if (!book) {
        return res.status(400).json({ error: 'No such book' })
    }

    res.status(200).json(book)
}

// update a Book
const updateBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such book' })
    }

    const book = await Book.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!book) {
        return res.status(400).json({ error: 'No such book' })
    }

    res.status(200).json(book)
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}