const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all Books
const getBooks = async (req, res) => {
    const books = await Book.find({})

    res.status(200).json(books)
}

// get a single Book
const getBook = async (req, res) => {
    res.json({ mssg: 'single' })
}

// create new Book
const createBook = async (req, res) => {
    const { title, author, cover, format, description, review, notes, isOwned, status, link } = req.body

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
    if (!isOwned) {
        emptyFields.push('isOwned')
    }
    if (!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields ', emptyFields })
    }

    // add doc to db
    try {
        const book = await Book.create({ title, author, cover, format, description, review, notes, isOwned, status, link })
        res.status(200).json(book)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete a Book
const deleteBook = async (req, res) => {
    res.json({ mssg: 'delete' })
}

// update a Book
const updateBook = async (req, res) => {
    res.json({ mssg: 'update' })
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}