import React from 'react'
import ReactDOM from 'react-dom'
import { IoMdClose } from "react-icons/io";

const BookFullDisplay = ({ book, setIsDisplayed }) => {

    console.log("Tags:", book);

    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={() => setIsDisplayed(false)}></div>
            <div className='book-full'>
                <IoMdClose className="close-icon" onClick={() => setIsDisplayed(false)} />
                <h2>{book.title}</h2>
                <p className='book-full-info'><span className='book-full-label'>Author: </span>{book.author}</p>
                <p className='book-full-info'><span className='book-full-label'>Format: </span>{book.format}</p>
                <ul>
                    {
                        book.tags?.map((tag, i) => (
                            <li key={i}>{tag}</li>
                        ))
                    }
                </ul>
                {
                    book.cover && <img src={book.cover} className='book-cover-full' alt={`${book.title} cover`} />
                }
                {/* more book details here */}
            </div>
        </>,
        document.body // render it outside the component tree
    )
}

export default BookFullDisplay