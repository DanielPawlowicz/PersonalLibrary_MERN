import React, { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import BookFullDisplay from '../pages/BookFullDisplay';

const BookDetails = ({ book }) => {

    const { dispatch } = useBooksContext()
    const [isDisplayed, setIsDisplayed] = useState(false);

    return (
        <div className='book-details'>
            <h4>{book.title}</h4>
            <button onClick={() => { setIsDisplayed(true) }}>More...</button>
            {
                book && isDisplayed && <BookFullDisplay book={book} />
            }
        </div>
    )
}

export default BookDetails