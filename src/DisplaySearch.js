import React from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'


class DisplaySearch extends React.Component {
  state = {
    searchResults: [],
    shelvedBooks: [],
    query: ''
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

  showSearch = (query, maxResults) => {
    if (query === '') {query = 'none'}
        BooksAPI.search(query, maxResults).then((searchResults) => {
            this.setState({searchResults})
            this.setShelf()
            })
            if (query === 'none') {query = ''}
            this.setState({query: query})
  }

    clearQuery = () => {
      this.showSearch('', 20)
  }

  setShelf = () => {
    if (this.state.searchResults === undefined) {return}
       else if(this.state.searchResults.error === 'empty query') {return}
       else if(this.state.searchResults === []) {return}
       else {

          this.state.searchResults.map((book) => book.shelf = 'none')
        
          this.state.searchResults.map((book, index) => this.addShelvedBook(book, index))
        }
  }

  addShelvedBook = (book) => {
    if (this.state.shelvedBooks.filter((b) => b.id === book.id).length === 1 ) {
      this.setState(state => 
      ({searchResults: state.searchResults.filter((b) => b.id !== book.id).concat(this.state.shelvedBooks.filter((b) => b.id === book.id))}))
    } 
  }


  render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
            <button className='clear-search' onClick={() => this.clearQuery()}>Clear</button>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.query} 
                 onChange={(event) => this.showSearch(event.target.value, 20)} 
                 placeholder="Search by title or author"/>
              </div>
          </div>
          <div className="search-books-results"> 
            {(this.state.searchResults === undefined || 
            (this.state.searchResults === []) ||
            (this.state.searchResults.error === 'empty query')) ? 
            (<h2 className='no-results'>No Results To Display.</h2>
            ) : ( 
              <ListBooks array={this.state.searchResults}  onUpdateBooks={this.updateBooks}/> )
            }   
          </div>
        </div>
      )
    }
}

export default DisplaySearch