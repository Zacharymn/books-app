import React from 'react'


class ListBooks extends React.Component {

	render() {
		return (
      <ol className="books-grid">
        {this.props.array.map((book) => 
        	<li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" 
                style={{ width: 128, height: 193, 
                backgroundImage: `url(${book.imageLinks && (book.imageLinks.thumbnail) })` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf}  
            			onChange={(event) => this.props.onUpdateBooks(book, event.target.value)}>
                  	<option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
              <div className="book-authors">
              {(book.authors && (book.authors.map((author, index) => 
              <p className='authors-list' 
              key={index}>{author}</p> ))) || (<p className='authors-list'>{book.publisher}</p>)} </div>
            </div>
          </li>
          )} 
 			</ol>     
		)
	}
}

export default ListBooks