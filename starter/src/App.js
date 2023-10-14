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
  const [cookie, setCookie] = useState([])
  const bookStatus = new BookStatus(
    bookShelf, setBooks, bookCurrentRead, setBookCurrentRead,
    bookRead, setBookRead, bookWantToRead, setBookWantToRead
  )

  let navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      let res = await BooksAPI.getAll()
      //console.log(res)
      
      let cookie = Cookies.get('book-arrangement-react') ? Cookies.get('book-arrangement-react'): ''
      const CookieObj = JSON.parse("["+cookie.trim()+"]")
      console.log(CookieObj)

      for (const r of res){
        for (const obj of CookieObj){
          if (obj.book_id === r.id){
            r.selection = obj.book_selection
            r.cookie = true
          }
        }
      }

      const curReadList = res.filter(r => r.selection==='currentlyReading')
                             .map(r => {
                              return {...r, blongingList:"currentlyReading"}
                             }) 

      const bookReadList = res.filter(r => r.selection==='read')
                              .map(r => {
                              return {...r, blongingList:"read"}
                              })
      const bookWantToReadList = res.filter(r => r.selection==='wantToRead')
                                    .map(r => {
                                    return {...r, blongingList:"wantToRead"}
                                    })
          
      console.log(res)
      console.log("current readlist")
      console.log(curReadList)
      console.log("readlist")
      console.log(bookReadList)
      console.log("WantToReadList")
      console.log(bookWantToReadList)
      setBooks(res)
      //console.log(res.filter(r => r.selection==='currentlyReading'))
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
        <SearchPage navigate={navigate} bookStatus={bookStatus} 
        />
      }/>
    </Routes>
   
  );
}

export default App;
