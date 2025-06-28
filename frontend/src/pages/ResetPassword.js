import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams()
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        try {
            const res = await fetch(`http://localhost:4000/api/user/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Something went wrong')

            setMessage('Password reset successful!')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h2>Enter new password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default ResetPassword