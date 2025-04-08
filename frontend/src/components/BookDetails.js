import React, { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import BookFullDisplay from '../pages/BookFullDisplay';

const BookDetails = ({ book }) => {

    const { dispatch } = useBooksContext()
    const [isDisplayed, setIsDisplayed] = useState(false);

    return (
        <div className='book-details'>
            {
                book.cover
                    ? <img src={book.cover} className='book-cover' alt={`${book.title} cover`} />
                    : <div className='alternate-cover'><h3>{book.title}</h3></div>
            }
            <h4>{book.title}</h4>
            <span className='book-details-author'>{book.author}</span><br />
            <button onClick={() => { setIsDisplayed(true) }}>More...</button>
            {
                book && isDisplayed && <BookFullDisplay book={book} setIsDisplayed={setIsDisplayed} />
            }
        </div>
    )
}

export default BookDetails