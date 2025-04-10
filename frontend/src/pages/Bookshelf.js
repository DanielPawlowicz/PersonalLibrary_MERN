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

    const refetchBooks = () => setTrigger(prev => prev + 1)

    console.log('All books:', books)

    const ownedBooks = books?.filter(book => book.isOwned === true || book.isOwned === 'true') || []

    console.log(ownedBooks)

    return (
        <div className='home'>
            <div className='books'>
                {ownedBooks.map((book) => (
                    <BookDetails key={book._id} thisBook={book} refetchBooks={refetchBooks} />
                ))}
            </div>
        </div>
    )
}

export default Bookshelf
