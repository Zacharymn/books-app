import React from 'react'
import './App.css'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'
import DisplaySearch from './DisplaySearch'


class BooksApp extends React.Component {
  render() {

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <DisplaySearch />
        )}/>   
        <Route exact path='/' render={() => (
         <BookShelf />
        )}/> 
      </div>
    )
  }
}

export default BooksApp
