import DisplayBooks from "./BookLists";


const ListBooks = ({navigate, bookStatus}) => {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <DisplayBooks books={bookStatus.bookCurrentRead} bookStatus={bookStatus}/>
                    
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <DisplayBooks books={bookStatus.bookWantToRead} bookStatus={bookStatus}/>
                  
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <DisplayBooks books={bookStatus.bookRead} bookStatus={bookStatus}/>
                    
                  
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a 
                onClick={() => navigate('/search')}
            >Add a book</a>
          </div>
        </div>
    )
}

export default ListBooks;