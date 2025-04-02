const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all Books
const getBooks = async (req, res) => {
    res.json({ mssg: 'all' })
}

// get a single Book
const getBook = async (req, res) => {
    res.json({ mssg: 'single' })
}

// create new Book
const createBook = async (req, res) => {
    res.json({ mssg: 'create' })
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