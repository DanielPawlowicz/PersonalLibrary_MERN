import { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'

const BookUpdateForm = ({ book, setIsEdit, refetchBooks }) => {

    const { dispatch } = useBooksContext()
    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [cover, setCover] = useState(book.cover)
    const [format, setFormat] = useState(book.format)
    const [tags, setTags] = useState(book.tags?.join(', ') || '')
    const [description, setDescription] = useState(book.description)
    const [review, setReview] = useState(book.review)
    const [isOwned, setIsOwned] = useState(book.isOwned)
    const [link, setLink] = useState(book.link)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log(tags)

        const tagArray = tags
            ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            : []

        // console.log(tagArray)

        const updatedBook = { title, author, cover, format, tags: tagArray, description, review, isOwned, link }

        const response = await fetch(`/api/books/${book._id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedBook),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // const ownedBoolean = isOwned === 'true';
            // const place = ownedBoolean ? 'Bookshelf' : 'Wishlist';

            setTitle(book.title)
            setAuthor(book.author)
            setCover(book.cover)
            setFormat(book.format)
            setTags(book.tags)
            setDescription(book.description)
            setReview(book.review)
            setIsOwned(book.isOwned)
            setLink(book.link)

            setError(null)
            setEmptyFields([])

            // console.log('new book added', json)
            // alert(`Book "${json.title}" from ${json.author} has been added succesfully to the ${place}`)
            alert(`Book has been updated successfully`)
            dispatch({ type: 'UPDATE_BOOK', payload: json })
            if (refetchBooks) refetchBooks()
            if (setIsEdit) setIsEdit(false)
        }
    }


    return (
        <div className='edit-form-container'>
            <form className='edit-form' onSubmit={handleSubmit}>
                <h3>Edit Book data</h3>

                <label>Title:<span className='required'>&nbsp;*</span></label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Author:<span className='required'>&nbsp;*</span></label>
                <input
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    className={emptyFields.includes('author') ? 'error' : ''}
                />

                <label>Cover:</label>
                <span>(You can paste here a link to the book cover photo e.g. from google graphics. The link needs to end with the graphics format: '.jpg', '.png', '.webp' etc.)</span>
                <input
                    type="text"
                    onChange={(e) => setCover(e.target.value)}
                    value={cover}
                />

                <label>Format:<span className='required'>&nbsp;*</span></label>
                <select
                    id="format"
                    onChange={(e) => setFormat(e.target.value)}
                    value={format}
                    className={emptyFields.includes('format') ? 'error' : ''}
                >
                    <option value="Paperback">Paperback</option>
                    <option value="Ebook Reader">Ebook Reader</option>
                    <option value="PDF">PDF</option>
                    <option value="Other">Other</option>
                </select>
                <br />

                <label>Where to save this book? <span className='required'>&nbsp;*</span></label>
                <select
                    id="place"
                    onChange={(e) => setIsOwned(e.target.value)}
                    value={isOwned}
                    className={emptyFields.includes('isOwned') ? 'error' : ''}
                >
                    <option value='true'>Bookshelf</option>
                    <option value='false'>Wishlist</option>
                </select>
                <br />

                {/* <label>Do you already have this book?<span className='required'>&nbsp;*</span></label>
                <div className="radio-group">
                    <label className="radio-option">
                        <input
                            type="radio"
                            name="ownsBook"
                            value="true"
                            checked={isOwned === 'true'}
                            onChange={(e) => setIsOwned(e.target.value)}
                        // className={emptyFields.includes('isOwned') ? 'error' : ''}
                        />
                        <span>Yes, I already have this book</span>
                    </label>

                    <label className="radio-option">
                        <input
                            type="radio"
                            name="ownsBook"
                            value="false"
                            checked={isOwned === 'false'}
                            onChange={(e) => setIsOwned(e.target.value)}
                        // className={emptyFields.includes('isOwned') ? 'error' : ''}
                        />
                        <span>No, but I wish to have this book</span>
                    </label>
                </div> */}

                <label>Tags:</label>
                <span>(Type in tags separated with a coma and a space, e.g.: fantasy, classic, war)</span>
                <input
                    type="text"
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                />

                <label>Description:</label>
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <label>Review:</label>
                <input
                    type="text"
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                />

                <label>Link:</label>
                <span>(You can add a link related with the book: store, review site etc.)</span>
                <input
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                />

                <button>Save changes</button>
                {error && <div className='error'>{error}</div>}

            </form>
        </div>
    )
}

export default BookUpdateForm