import React from 'react'

const BookFullDisplay = ({ book, setIsDisplayed }) => {
    return (
        <div className='book-full'>BookFullDisplay
            <h2>{book.title}</h2>
        </div>
    )
}

export default BookFullDisplay