require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bookRoutes = require('./routes/books')
const userRoutes = require('./routes/user')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

// express app
const app = express()

app.use(cors(corsOptions))

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/books', bookRoutes)
app.use('/api/user', userRoutes)
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })

    }).catch((error) => {
        console.log(error)
    })


