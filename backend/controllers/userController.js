const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt')


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const resetPasswordRequest = async (req, res) => {
    const { email } = req.body

    if (!email) return res.status(400).json({ error: 'Email is required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const token = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000 // 1 godzina
    await user.save()

    const resetUrl = `http://localhost:3000/reset-password/${token}` // frontend

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'personallibrary.app@gmail.com',
            pass: 'pidx ixvr vqhm gxep' // hasło aplikacji z Google
        }
    })

    await transporter.sendMail({
        to: user.email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`
    })

    res.status(200).json({ message: 'Reset link sent to email' })
}

const resetPassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body

    if (!newPassword) return res.status(400).json({ error: 'Password is required' })

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) return res.status(400).json({ error: 'Token is invalid or expired' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.status(200).json({ message: 'Password has been reset' })
}

module.exports = { signupUser, loginUser, resetPasswordRequest, resetPassword }