import { useEffect } from 'react'
import BookDetails from '../components/BookDetails'
import { useBooksContext } from '../hooks/useBooksContext'

const Bookshelf = () => {

    const { books, dispatch } = useBooksContext()

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/books')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_BOOKS', payload: json })
            }
        }

        fetchBooks()
    }, [dispatch])

    return (
        <div className='home'>
            <div className='books'>
                {books && books.map((book) => (
                    <BookDetails key={book._id} book={book} />
                ))}
            </div>
        </div>
    )
}

export default Bookshelf