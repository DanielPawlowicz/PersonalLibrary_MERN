import { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const AddBookForm = () => {

    const { dispatch } = useBooksContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [cover, setCover] = useState('')
    const [format, setFormat] = useState('Paperback')
    const [tags, setTags] = useState('')
    const [description, setDescription] = useState('')
    const [review, setReview] = useState('')
    // const [isOwned, setIsOwned] = useState(true)
    const [category, setCategory] = useState('Bookshelf')
    const [link, setLink] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [status, setStatus] = useState('In queue')
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        // console.log(tags)

        const tagArray = tags
            ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            : []

        // console.log('isOwned: ' + isOwned)

        const book = { title, author, cover, format, tags: tagArray, description, review, category, status, link }

        // console.log(book)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/`, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // const ownedBoolean = isOwned === 'Bookshelf';
            // const place = ownedBoolean ? 'Bookshelf' : 'Wishlist';

            setTitle('')
            setAuthor('')
            setCover('')
            setFormat('Paperback')
            setTags('')
            setDescription('')
            setReview('')
            setCategory('Bookshelf')
            setStatus('In queue')
            setLink('')

            setError(null)
            setEmptyFields([])

            // console.log('new book added', json)
            alert(`Book "${json.title}" from ${json.author} has been added succesfully to the ${category}`)
            dispatch({ type: 'CREATE_BOOK', payload: json })
        }
    }


    return (
        <div className='form-container'>
            <form className='create-form' onSubmit={handleSubmit}>
                <h3>Add a New Book</h3>

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

                <label>Where to save this book? <span className='required'>&nbsp;*</span></label>
                <select
                    id="place"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className={emptyFields.includes('category') ? 'error' : ''}
                >
                    <option value='Bookshelf'>Bookshelf</option>
                    <option value='Wishlist'>Wishlist</option>
                    <option value='Audiobooks'>Audiobooks</option>
                </select>
                <br />

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

                <label>Status:</label>
                <span>(You can choose it only if you selected "Bookshelf" as a place to store this book)</span>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={category === 'Wishlist'} // disable if Wishlist
                >
                    <option value="In queue">In queue</option>
                    <option value="Reading now">Reading now</option>
                    <option value="In the future">In the future</option>
                    <option value="Already read">Already read</option>
                </select>

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

                <button>Add the Book</button>
                {error && <div className='error'>{error}</div>}

            </form>
        </div>
    )
}

export default AddBookForm