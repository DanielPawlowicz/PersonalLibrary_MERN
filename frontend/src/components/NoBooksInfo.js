import React from 'react'
import { NavLink } from 'react-router-dom'

const NoBooksInfo = () => {
    return (
        <div className='no-books-container'>

            <h1>You don't have any books here yet</h1>
            <h2>If you want to add some, go to the&nbsp;
                <NavLink to='/addBook' className={({ isActive }) => isActive ? 'active-navbar-link' : ''}>
                    <span>Add a Book</span>
                </NavLink>
                &nbsp;page
            </h2>

        </div>
    )
}

export default NoBooksInfo