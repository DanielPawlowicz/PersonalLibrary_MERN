import { useEffect, useCallback, useState } from 'react'
import BookDetails from '../components/BookDetails'
import { useBooksContext } from '../hooks/useBooksContext'

const Wishlist = () => {
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

    const wishedBooks = books?.filter(book => book.isOwned === false || book.isOwned === 'false') || []

    console.log(wishedBooks)

    return (
        <div className='home'>
            <div className='books'>
                {wishedBooks.map((book) => (
                    <BookDetails key={book._id} thisBook={book} refetchBooks={refetchBooks} />
                ))}
            </div>
        </div>
    )
}

export default Wishlist
