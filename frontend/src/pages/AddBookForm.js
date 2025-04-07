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


            </form>
        </div>
    )
}

export default AddBookForm