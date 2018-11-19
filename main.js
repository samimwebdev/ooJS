/* eslint-disable */
// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookList = function(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>  
    <td>${book.author}</td>  
    <td>${book.isbn}</td>  
    <td><a href="#" class="btn btn-danger delete">X</a></td>
  `;
  list.appendChild(row);
};
UI.prototype.showAlert = function(message, className) {
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
};
UI.prototype.deleteBook = function(target) {
  if (target.classList.value.includes('delete')) {
    console.log(target);
    target.parentElement.parentElement.remove();
  } else {
    console.log(Error('error'));
  }
};
UI.prototype.clearField = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Insantiate book
  const book = new Book(title, author, isbn);
  // Insantiate UI
  console.log(book);
  const ui = new UI();
  // validate field
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('please fill in all field', 'error');
  } else {
    ui.addBookList(book);
    ui.showAlert('Book Added', 'success');
  }

  //clear field
  ui.clearField();
  e.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  //Instantiate UI
  const ui = new UI();
  //Delete Book
  ui.deleteBook(e.target);
  ui.showAlert('Book Removed', 'success');
  e.preventDefault();
});
