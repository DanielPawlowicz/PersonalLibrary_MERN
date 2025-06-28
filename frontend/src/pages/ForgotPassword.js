import { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        try {
            const res = await fetch('http://localhost:4000/api/user/reset-password-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Something went wrong')

            setMessage(data.message)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='reset-password-container'>
            <h2>Give an Email addres to reset your password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send reset link</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default ForgotPassword