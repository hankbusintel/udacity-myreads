import DisplayBooks from './BookLists'
import { useEffect, useState } from 'react';
import * as BooksAPI from '../api/BooksAPI'


const SearchPage = ({navigate, bookStatus, selectionUpdateFunc}) => {
  const [query, setQuery] = useState("");

  const updateSelectionState = (result) => {
    const bookLists = [bookStatus.bookRead, bookStatus.bookCurrentRead, bookStatus.bookWantToRead]
    let bookSelectResult;
    bookLists.forEach( item => {
      bookSelectResult= selectionUpdateFunc(result, item)
    })
    
    return bookSelectResult;
  }

  const updateQuery = (query) => {
    setQuery(query.toLowerCase());
    if (query.length > 0) {
      BooksAPI.search(query, 20)
    .then(result => 
      {
        if (!result.error) {
          //console.log(result)
          const booksInShelf = updateSelectionState(result)
          bookStatus.setBooks(result)
        } else {
          bookStatus.setBooks([])
        }
      }
    ).catch((err) =>
      {//console.log(err)
        bookStatus.setBooks(bookStatus.bookShelf)
      }
    )} else {
      bookStatus.setBooks([])
    }
  
  };


  return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
              onClick={() => navigate("/")}
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            
          <DisplayBooks books={bookStatus.bookShelf} bookStatus={bookStatus} />
              
          </ol>
        </div>
      </div>
  )
}

export default SearchPage;