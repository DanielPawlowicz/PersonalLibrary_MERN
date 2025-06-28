const express = require('express')

// controller functions
const { signupUser, loginUser, resetPasswordRequest, resetPassword } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// request password reset
router.post('/reset-password-request', resetPasswordRequest)

// pasword reset
router.post('/reset-password/:token', resetPassword)

module.exports = router