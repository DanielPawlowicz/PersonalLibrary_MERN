import { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'

const AddBookForm = () => {

    const { dispatch } = useBooksContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [cover, setCover] = useState('')
    const [format, setFormat] = useState('Paperback')
    const [tags, setTags] = useState([])
    const [description, setDescription] = useState('')
    const [review, setReview] = useState('')
    const [isOwned, setIsOwned] = useState('')
    const [link, setLink] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const tagArray = tags
            .split(', ')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const book = { title, author, cover, format, tagArray, description, review, isOwned, link }

        console.log('new book added', book)

    }


    return (
        <div className='form-container'>
            <form className='create-form' onSubmit={handleSubmit}>
                <h3>Add a New Book</h3>

                <label>Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Author:</label>
                <input
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    className={emptyFields.includes('author') ? 'error' : ''}
                />

                <label>Cover:</label>
                <input
                    type="text"
                    onChange={(e) => setCover(e.target.value)}
                    value={cover}
                />

                <label>Format:</label>
                <select
                    id="format"
                    onChange={(e) => setFormat(e.target.value)}
                    value={format}
                    className={emptyFields.includes('title') ? 'error' : ''}
                >
                    <option value="Paperback">Paperback</option>
                    <option value="Ebook Reader">Ebook Reader</option>
                    <option value="PDF">PDF</option>
                    <option value="Other">Other</option>
                </select>

                <label>Tags:</label>
                <span>* Type in tags separated with a coma and a space, e.g.: fantasy, classic, war</span>
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

                <label>Do you already have this book?</label>
                <label>
                    <input
                        type="radio"
                        name="ownsBook"
                        value="true"
                        checked={isOwned === 'true'}
                        onChange={(e) => setIsOwned(e.target.value)}
                        className={emptyFields.includes('isOwned') ? 'error' : ''}
                    />
                    Yes, I already have this book
                </label>
                <label>
                    <input
                        type="radio"
                        name="ownsBook"
                        value="false"
                        checked={isOwned === 'false'}
                        onChange={(e) => setIsOwned(e.target.value)}
                        className={emptyFields.includes('isOwned') ? 'error' : ''}
                    />
                    No, but I wish to have this book
                </label>

                <label>Link:</label>
                <span>* you can add a link related with the book: store, review site etc.</span>
                <input
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                />

                <button>Add the Book</button>
                {error && <div className='error'>{error}</div>}

            </form>
        </div>
    )
}

export default AddBookForm