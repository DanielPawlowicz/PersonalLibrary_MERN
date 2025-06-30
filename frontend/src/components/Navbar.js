import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { FiMenu, FiX } from 'react-icons/fi' // hamburger (menu) and close icons

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = () => {
    logout()
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header>
      <div className="container navbar-container">
        <NavLink to='/' onClick={closeMenu}>
          <h1>Personal Library</h1>
        </NavLink>

        {/* Hamburger Icon */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to='/' end className={({ isActive }) => isActive ? 'active-navbar-link' : ''} onClick={closeMenu}>
            <h2>Bookshelf</h2>
          </NavLink>
          <NavLink to='/wishlist' className={({ isActive }) => isActive ? 'active-navbar-link' : ''} onClick={closeMenu}>
            <h2>Wishlist</h2>
          </NavLink>
          <NavLink to='/audiobooks' className={({ isActive }) => isActive ? 'active-navbar-link' : ''} onClick={closeMenu}>
            <h2>Audiobooks</h2>
          </NavLink>
          <NavLink to='/addBook' className={({ isActive }) => isActive ? 'active-navbar-link' : ''} onClick={closeMenu}>
            <h4>Add a Book</h4>
          </NavLink>

          <nav>
            {user ? (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>
            ) : (
              <div>
                <Link to="/login" onClick={closeMenu}>Login</Link>
                <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
