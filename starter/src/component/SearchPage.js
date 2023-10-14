import DisplayBooks from './BookLists'
import { useState } from 'react';


const SearchPage = ({navigate, bookStatus}) => {
  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    console.log(query)
    setQuery(query.toLowerCase());
  };

  const bookShelf = query ==="" ? bookStatus.bookShelf: bookStatus.bookShelf.filter(book => 
    book.title.toLowerCase().includes(query) ||
    book.authors.join(",").toLowerCase().includes(query) ||
    book.industryIdentifiers.map(i => i.identifier).join(",").toLowerCase().includes(query)
    )
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
            
          <DisplayBooks books={bookShelf} bookStatus={bookStatus} />
              
          </ol>
        </div>
      </div>
  )
}

export default SearchPage;