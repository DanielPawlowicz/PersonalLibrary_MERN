import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { IoMdClose } from "react-icons/io";
import { useBooksContext } from '../hooks/useBooksContext';
import BookUpdateForm from './BookUpdateForm';

const BookFullDisplay = ({ book, setIsDisplayed }) => {

    const { dispatch } = useBooksContext()
    const [isEdit, setIsEdit] = useState(false);

    const handleDelete = async () => {
        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_BOOK', payload: json })
        }
    }


    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={() => setIsDisplayed(false)}></div>
            <div className='book-full'>
                <IoMdClose className="close-icon" onClick={() => setIsDisplayed(false)} />
                <div className='book-full-left'>
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
                        book.description &&
                        <p className='book-full-info'><span className='book-full-label'>Description: </span>{book.description}</p>
                    }
                    {
                        book.review &&
                        <p className='book-full-info'><span className='book-full-label'>Review: </span>{book.review}</p>
                    }
                    {
                        book.link &&
                        <p className='book-full-info'><span className='book-full-label'>Link: </span><a href={book.link} target="_blank">{book.link}</a></p>
                    }

                    <button className='delete' onClick={() => handleDelete()}>Delete Book</button>
                    <button className='edit' onClick={() => setIsEdit(true)}>Edit Book</button>

                </div>
                <div className='book-full-right'>
                    {
                        book.cover && <img src={book.cover} className='book-cover-full' alt={`${book.title} cover`} />
                    }
                </div>
                <div className='clear'></div>
            </div>
            {isEdit && <BookUpdateForm book={book} setIsEdit={setIsEdit} />}

        </>,
        document.body // render it outside the component tree
    )
}

export default BookFullDisplay