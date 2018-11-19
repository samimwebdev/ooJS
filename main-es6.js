/* eslint-disable */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>  
    <td>${book.author}</td>  
    <td>${book.isbn}</td>  
    <td><a href="#" class="btn btn-danger delete">X</a></td>
  `;
    list.appendChild(row);
  }
  showAlert(message, className) {
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container .container-form');
    //get form
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 1000);
  }
  deleteBook(target) {
    if (target.classList.value.includes('delete')) {
      console.log(target);
      target.parentElement.parentElement.remove();
    } else {
      console.log(Error('error'));
    }
  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      //Add Book to the UI
      ui.addBookList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks());
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Insantiate book
  const book = new Book(title, author, isbn);
  // Insantiate UI
  //console.log(book);
  const ui = new UI();
  // validate field
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('please fill in all field', 'error');
  } else {
    ui.addBookList(book);
    //Add to LS
    Store.addBook(book);
    ui.showAlert('Book Added', 'success');
    //clear field
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  //Instantiate UI
  const ui = new UI();
  //Delete Book
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Removed', 'success');
  e.preventDefault();
});
