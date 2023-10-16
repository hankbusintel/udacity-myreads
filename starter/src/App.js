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
      if (!b.blongingList) {
        b.blongingList = b.shelf
        b.selection = b.shelf
      }
      
      for (const r of ref){
        if (b.id === r.id){
          b.selection = r.selection
          b.blongingList = r.selection
          b.cookie = true
          
        }
      }

    }
    return booklist
  }


  const populateDefault = (cookie, books) => {
    const uniqueCookieId = cookie.map(r => r.id)
    //console.log(cookie)
    books.forEach(b => {
      if (b.shelf && !uniqueCookieId.includes(b.id)) {
        b.selection = b.shelf
        let newItem = {id: b.id, selection: b.shelf,
          title: b.title, authors: b.authors.join(','), imageLinks: b.imageLinks.thumbnail,
        cookie: true}
        //const newCookieString = convertUpdateJson(cookie, newItem)
        //console.log(newCookieString)
        cookie.push(newItem)
        //Cookies.set('book-arrangement-react', newCookieString)
        
      }
    });
    return cookie;
  }

  const filterCookie = (cookie, selection) => {
    
    const newList = cookie.filter(c => c.selection===selection)
                    .map(c => {
                    return {...c, blongingList:selection}
                    }) 
    return newList
  }

  useEffect(() => {
    const getBooks = async () => {
      let res = await BooksAPI.getAll()
      console.log(res)
      
      let cookie = Cookies.get('book-arrangement-react') ? Cookies.get('book-arrangement-react'): ''
      let CookieObj = JSON.parse("["+cookie.trim()+"]")
      //console.log(CookieObj)
      
      res = updateSelectionStates(res, CookieObj)
      CookieObj = populateDefault(CookieObj, res)
      
      const curReadList = filterCookie(CookieObj, 'currentlyReading')
      const bookReadList = filterCookie(CookieObj, 'read')
      const bookWantToReadList = filterCookie(CookieObj, 'wantToRead')
      //console.log(bookWantToReadList)
      //setBooks(res)
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
