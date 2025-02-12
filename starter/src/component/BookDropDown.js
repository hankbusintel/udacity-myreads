import { useState } from "react"
import Cookies from 'js-cookie'
import * as BookAPI from '../api/BooksAPI'


const BookDropDown = ({handleChange, book}) => {


    const bookSelect = book.selection? book.selection: "none"

    const convertUpdateJson = (cookieObj, newItem) => {
        let isUpdate = false;
        const newCookie = cookieObj.map(
            obj => {
                //console.log(obj.book_id, newItem.book_id)
                if (obj.id === newItem.id) {
                    isUpdate = true;
                    return newItem
                }
                else {
                    
                    return obj
                }
            }
        )
        if (!isUpdate) {
            newCookie.push(newItem)
        }
        //console.log(newCookie)
        return JSON.stringify(newCookie).replace('[','').replace(']','')
    }

    const updateCookie = (event) => {
        book.selection = event.target.value

        let cookie = Cookies.get('book-arrangement-react') ? Cookies.get('book-arrangement-react'): ''
        const CookieObj = JSON.parse("["+cookie.trim()+"]")
        //console.log(CookieObj)
        const bookAuthors = book.authors instanceof Array? book.authors.join(","): book.authors
        const bookImage = typeof book.imageLinks === 'object'? book.imageLinks.thumbnail:book.imageLinks
        const newItem = {id: book.id, selection: book.selection,
        title: book.title, authors: bookAuthors, imageLinks: bookImage}
        const newCookieString = convertUpdateJson(CookieObj, newItem)
        //const newCookieString = cookie.length === 0 ? JSON.stringify(newItem): cookie+","+JSON.stringify(newItem)
        Cookies.set('book-arrangement-react', newCookieString)
    }

    const updateBookAPI = (shelf) => {
        BookAPI.update(book,shelf)
    }

    return (
        
            <select defaultValue={bookSelect} onChange={(event) => {
                    handleChange(book, event.target.value)
                    updateCookie(event)
                    updateBookAPI(book, event.target.value)
                }
            }>
                <option value="none-v2" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            
        
    )
    
}

export default BookDropDown;