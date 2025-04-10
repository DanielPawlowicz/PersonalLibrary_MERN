// Bookshelf.jsx
import { useEffect, useCallback, useState } from 'react'
import BookDetails from '../components/BookDetails'
import { useBooksContext } from '../hooks/useBooksContext'

const Bookshelf = () => {
    const { books, dispatch } = useBooksContext()
    const [trigger, setTrigger] = useState(0)

    const fetchBooks = useCallback(async () => {
        const response = await fetch('/api/books')
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_BOOKS', payload: json })
        }
    }, [dispatch])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks, trigger])

    // Pass refetch function to children via props
    const refetchBooks = () => setTrigger(prev => prev + 1)

    return (
        <div className='home'>
            <div className='books'>
                {books && books.map((book) => (
                    <BookDetails key={book._id} thisBook={book} refetchBooks={refetchBooks} />
                ))}
            </div>
        </div>
    )
}

export default Bookshelf
