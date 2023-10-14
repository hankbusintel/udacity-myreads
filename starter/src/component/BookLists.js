import BookDropDown from "./BookDropDown"


const DisplayBooks = ({books, bookStatus}) => {


    const isExists = (book, parentBookList) => {
        if (parentBookList.length === 0) {
            return false
        }
        const existingBook = parentBookList.filter(b => b.id === book.id)

        return existingBook.length === 0? false: true
    }
    
    const putBookItem = (book, bookListObj, bookListSetter, actionItem) => {
        
        if (!isExists(book, bookListObj)) {
            bookListObj.push(book)
            bookListSetter(bookListObj)
            console.log(book.blongingList)
            if (book.blongingList === 'currentlyReading') {
                bookStatus.setBookCurrentRead(
                    bookStatus.bookCurrentRead.filter(
                        b => b.id !== book.id
                    )
                )
            }
            else if (book.blongingList === 'wantToRead') {
                bookStatus.setBookWantToRead(
                    bookStatus.bookWantToRead.filter(
                        b => b.id !== book.id
                    )
                )
            }
            else if (book.blongingList === 'read') {
                bookStatus.setBookRead(
                    bookStatus.bookRead.filter(
                        b => b.id !== book.id
                    )
                )
            }
    
            book.blongingList = actionItem
        }
        
    }

    const handleChange = (book, actionItem) => {

        //const actionItem = event.target.value
        console.log(actionItem)
        
        // console.log(event.target)
        if (actionItem === "currentlyReading" ) {
            putBookItem(book, bookStatus.bookCurrentRead, bookStatus.setBookCurrentRead, actionItem)
        }

        else if (actionItem === "wantToRead" ) {
            putBookItem(book, bookStatus.bookWantToRead, bookStatus.setBookWantToRead, actionItem)
        }

        else if (actionItem === "read" ) {
            putBookItem(book, bookStatus.bookRead, bookStatus.setBookRead, actionItem)
        }
        

        
    }
    return (

            books.map((book) => 
            {

                return (
                <li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                        <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 188,
                            backgroundImage:
                            `url("${book.imageLinks.thumbnail}")`,
                        }}
                        ></div>
                        <div className="book-shelf-changer">
                        <BookDropDown handleChange={handleChange} book={book} />
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors.join(",")}</div>
                    </div>
                </li>
                )
            }
                
                )
            

    )
}

export default DisplayBooks;