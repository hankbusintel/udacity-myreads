import DisplayBooks from './BookLists'
import { useEffect, useState } from 'react';
import * as BooksAPI from '../api/BooksAPI'


const SearchPage = ({navigate, bookStatus}) => {
  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    //console.log(query)
    setQuery(query.toLowerCase());
    BooksAPI.search(query, 20)
    .then(result => 
      {
        if (result) {
          
          bookStatus.setBooks(result)
        } 
      }
    )
      
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