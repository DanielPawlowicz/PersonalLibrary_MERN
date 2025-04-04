import React from 'react'
import { useBooksContext } from '../hooks/useBooksContext'

const BookDetails = ({ book }) => {

    const { dispatch } = useBooksContext()

    return (
        <div className='book-details'>
            <h4>{book.title}</h4>
        </div>
    )
}

export default BookDetails