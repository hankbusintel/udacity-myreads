import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import ListBooks from "./component/BookManagementUI";
import SearchPage from "./component/SearchPage";
import * as BooksAPI from "./api/BooksAPI"
import Cookies from 'js-cookie';
import BookStatus from "./model/BookStatus";


function App() {
  // const [showSearchPage, setShowSearchpage] = useState(true);
  const [bookShelf, setBooks] = useState([]);
  const [bookCurrentRead, setBookCurrentRead] = useState([]);
  const [bookRead, setBookRead] = useState([]);
  const [bookWantToRead, setBookWantToRead] = useState([]);
  const bookStatus = new BookStatus(
    bookShelf, setBooks, bookCurrentRead, setBookCurrentRead,
    bookRead, setBookRead, bookWantToRead, setBookWantToRead
  )

  let navigate = useNavigate();

  const updateSelectionStates = (booklist, ref) => {
    for (const b of booklist){
      for (const r of ref){
        if (b.id === r.id){
          b.selection = r.selection
          b.cookie = true
        }
      }
    }
    return booklist
  }

  useEffect(() => {
    const getBooks = async () => {
      let res = await BooksAPI.getAll()
      //console.log(res)
      
      let cookie = Cookies.get('book-arrangement-react') ? Cookies.get('book-arrangement-react'): ''
      const CookieObj = JSON.parse("["+cookie.trim()+"]")
      //console.log(CookieObj)
      res = updateSelectionStates(res, CookieObj)
  
      const curReadList = CookieObj.filter(c => c.selection==='currentlyReading')
                             .map(c => {
                              return {...c, blongingList:"currentlyReading"}
                             }) 

      const bookReadList = CookieObj.filter(c => c.selection==='read')
                              .map(c => {
                              return {...c, blongingList:"read"}
                              })
      const bookWantToReadList = CookieObj.filter(c => c.selection==='wantToRead')
                                    .map(c => {
                                    return {...c, blongingList:"wantToRead"}
                                    })
      //console.log(res)
      setBooks(res)
      setBookCurrentRead(curReadList)
      setBookRead(bookReadList)
      setBookWantToRead(bookWantToReadList)

    }
    
    getBooks();
  },[])



  return (
    <Routes>
      <Route exact path="/" element={
        <ListBooks navigate={navigate} bookStatus={bookStatus}/>
      }/>

      <Route exact path="/search" element={
        <SearchPage navigate={navigate} bookStatus={bookStatus} selectionUpdateFunc={updateSelectionStates}
        />
      }/>
    </Routes>
   
  );
}

export default App;
