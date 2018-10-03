import React from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class BookShelf extends React.Component {
  state = {
    shelvedBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((shelvedBooks) => {
        this.setState({shelvedBooks})  
      })
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((shelvedBooks) => {
        this.setState({shelvedBooks}) })
  }

  render() {
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
                  <ListBooks array={this.state.shelvedBooks.filter((book) => book.shelf === 'currentlyReading')} 
                  onUpdateBooks={this.updateBooks} /> 
                </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ListBooks array={this.state.shelvedBooks.filter((book) => book.shelf === 'wantToRead')} 
                  onUpdateBooks={this.updateBooks} />
                </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ListBooks array={this.state.shelvedBooks.filter((book) => book.shelf === 'read')} 
                  onUpdateBooks={this.updateBooks} />
                </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
  
}

export default BookShelf