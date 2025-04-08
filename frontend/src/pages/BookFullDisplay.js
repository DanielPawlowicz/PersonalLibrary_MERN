import React from 'react'
import ReactDOM from 'react-dom'

const BookFullDisplay = ({ book, setIsDisplayed }) => {
    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={() => setIsDisplayed(false)}></div>
            <div className='book-full'>
                <button onClick={() => setIsDisplayed(false)}>Close</button>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                {/* more book details here */}
            </div>
        </>,
        document.body // render it outside the component tree
    )
}

export default BookFullDisplay