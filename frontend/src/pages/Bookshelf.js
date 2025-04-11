import { useEffect, useCallback, useState } from 'react'
import BookDetails from '../components/BookDetails'
import { useBooksContext } from '../hooks/useBooksContext'
import { ImSearch } from "react-icons/im";


const Bookshelf = () => {

    const { books, dispatch } = useBooksContext()
    const [trigger, setTrigger] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFormats, setSelectedFormats] = useState(new Set())
    const [sortOrder, setSortOrder] = useState('none') // 'asc', 'desc', or 'none'

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

    // console.log('All books:', books)

    const ownedBooks = books?.filter(book => book.isOwned === true || book.isOwned === 'true') || []

    // console.log(ownedBooks)

    const filteredBooks = ownedBooks.filter(book => {
        const matchesSearch = [book.title, book.author, ...(book.tags || [])]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        const matchesFormat = selectedFormats.size === 0 || selectedFormats.has(book.format)

        return matchesSearch && matchesFormat
    })

    if (sortOrder === 'asc') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === 'desc') {
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title))
    }

    return (
        <div className='home'>
            <div className='filters-bar'>
                <ImSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by title, author, or tags "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-bar'
                />

                <div className='filter-checkboxes'>
                    {['Paperback', 'Ebook Reader', 'PDF', 'Other'].map(format => (
                        <label key={format}>
                            <input
                                type="checkbox"
                                value={format}
                                checked={selectedFormats.has(format)}
                                onChange={(e) => {
                                    const updated = new Set(selectedFormats)
                                    if (e.target.checked) {
                                        updated.add(format)
                                    } else {
                                        updated.delete(format)
                                    }
                                    setSelectedFormats(updated)
                                }}
                            />
                            {format}
                        </label>
                    ))}

                    <label>
                        <input
                            type="checkbox"
                            checked={sortOrder === 'asc'}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSortOrder('asc')
                                } else {
                                    setSortOrder('none')
                                }
                            }}
                        />
                        A → Z
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={sortOrder === 'desc'}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSortOrder('desc')
                                } else {
                                    setSortOrder('none')
                                }
                            }}
                        />
                        Z → A
                    </label>
                </div>
            </div>



            <div className='books-by-status'>
                {['Reading now', 'In queue', 'In the future', 'Already read'].map((status) => {
                    const booksInStatus = filteredBooks.filter(book => book.status === status)

                    if (booksInStatus.length === 0) return null

                    return (
                        <div key={status} className='status-section'>
                            <h5>{status}</h5>
                            <div className='books'>
                                {booksInStatus.map(book => (
                                    <BookDetails key={book._id} thisBook={book} refetchBooks={refetchBooks} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Bookshelf
