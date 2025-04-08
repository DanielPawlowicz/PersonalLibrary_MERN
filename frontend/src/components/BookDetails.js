import React, { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import BookFullDisplay from '../pages/BookFullDisplay';
import { TbPdf } from "react-icons/tb"; // pdf
import { MdOutlineDeviceUnknown } from "react-icons/md"; // other
import { GiBlackBook } from "react-icons/gi"; // book
import { MdOutlineTabletMac } from "react-icons/md"; // ebook reader


const BookDetails = ({ book }) => {

    const { dispatch } = useBooksContext()
    const [isDisplayed, setIsDisplayed] = useState(false);

    // Format icon logic
    const getFormatIcon = (format) => {
        switch (format) {
            case 'Paperback':
                return <GiBlackBook />
            case 'Ebook Reader':
                return <MdOutlineTabletMac />
            case 'PDF':
                return <TbPdf />
            case 'Other':
                return <MdOutlineDeviceUnknown />
            default:
                return null
        }
    }


    return (
        <div className='book-details'>
            {
                book.cover
                    ? <img src={book.cover} className='book-cover' alt={`${book.title} cover`} />
                    : <div className='alternate-cover'><h3>{book.title}</h3></div>
            }

            <div className='book-details-icon'>
                {getFormatIcon(book.format)}
            </div>

            <h4 className='book-details-title'>{book.title}</h4>
            <span className='book-details-author'>{book.author}</span><br />
            <button onClick={() => { setIsDisplayed(true) }}>More...</button>
            {
                book && isDisplayed && <BookFullDisplay book={book} setIsDisplayed={setIsDisplayed} />
            }
        </div>
    )
}

export default BookDetails