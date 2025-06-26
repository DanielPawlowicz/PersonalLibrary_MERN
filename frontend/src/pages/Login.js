import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const { login, error, isLoading } = useLogin()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
        // console.log(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Log in</h3>

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
            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login