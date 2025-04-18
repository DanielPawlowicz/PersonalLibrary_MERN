import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
        // console.log(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email: </label>
            <input
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
            />

            <label>Password: </label>
            <input
                type="password"
                onChange={(e) => { setpassword(e.target.value) }}
                value={password}
            />
            {/* <button>Sign Up</button> */}
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup