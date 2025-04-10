import React from 'react'
import { NavLink } from "react-router-dom"

const Navbar = () => {
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
                <NavLink to='/addBook' className={({ isActive }) => isActive ? 'active-navbar-link' : ''}>
                    <h4>Add a Book</h4>
                </NavLink>
            </div>
        </header>
    )
}


export default Navbar