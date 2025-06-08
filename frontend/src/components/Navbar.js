import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }


    return (
        <header>
            <div className="container">
                <NavLink to='/'>
                    <h1>Personal Library</h1>
                </NavLink>
                <NavLink to='/' end className={({ isActive }) => isActive ? 'active-navbar-link' : ''}>
                    <h2>Bookshelf</h2>
                </NavLink>
                <NavLink to='/wishlist' className={({ isActive }) => isActive ? 'active-navbar-link' : ''}>
                    <h2>Wishlist</h2>
                </NavLink>
                <NavLink to='/audiobooks' className={({ isActive }) => isActive ? 'active-navbar-link' : ''}>
                    <h2>Audiobooks</h2>
                </NavLink>
                <NavLink to='/addBook' className={({ isActive }) => isActive ? 'active-navbar-link' : ''}>
                    <h4>Add a Book</h4>
                </NavLink>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}


export default Navbar