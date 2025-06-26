import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const { signup, error, isLoading } = useSignup()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

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
                type={passwordVisible ? 'text' : 'password'}
                onChange={(e) => { setpassword(e.target.value) }}
                value={password}
                className="passwordInput"
            />
            <FaEyeSlash className='togglePassword' onClick={togglePasswordVisibility} />
            {/* <button>Log in</button> */}
            <br />
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup