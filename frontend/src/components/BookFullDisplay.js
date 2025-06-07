import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { IoMdClose } from "react-icons/io";
import { useBooksContext } from '../hooks/useBooksContext';
import BookUpdateForm from './BookUpdateForm';
import { FaTrashAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuthContext } from '../hooks/useAuthContext';

const BookFullDisplay = ({ book, setIsDisplayed, refetchBooks }) => {

    const { dispatch } = useBooksContext()
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuthContext();

    const handleDelete = async () => {

        if (!user) {
            return
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/` + book._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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

                    <FaTrashAlt className='delete' onClick={() => handleDelete()} />
                    <IoSettingsSharp className='edit' onClick={() => setIsEdit(true)} />

                </div>
                <div className='book-full-right'>
                    {
                        book.cover && <img src={book.cover} className='book-cover-full' alt={`${book.title} cover`} />
                    }
                </div>
                <div className='clear'></div>
            </div>
            {isEdit && <BookUpdateForm book={book} setIsEdit={setIsEdit} refetchBooks={refetchBooks} />}

        </>,
        document.body // render it outside the component tree
    )
}

export default BookFullDisplay