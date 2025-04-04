import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Personal Library</h1>
                </Link>
                <Link to='/'>
                    <h2>Bookshelf</h2>
                </Link>
                <Link to='/wishlist'>
                    <h2>Wishlist</h2>
                </Link>
                <Link to='/addBook'>
                    <h4>Add a Book</h4>
                </Link>
            </div>
        </header>
    )
}

export default Navbar