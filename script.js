let myLibrary = [];

// constructor
function Book(title = '', author = '', pages = 0, status = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status= status;
}

/**
 * add Book to array
 */
Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

/**
 * change read status of Book
 */
Book.prototype.changeStatus = function (status) {
    this.status = status;
}

/**
 * Brings popup menu where current book info is displayed and can be modified
 */
 Book.prototype.editBook = function() {

}

/**
 * remove Book from array 
*/
Book.prototype.removeBook = function() {
    myLibrary = myLibrary.filter(bookObj => bookObj != this);
}

/**
 * iterates through array and displays each element
 */
function displayLibrary(){
    
}

/**
 * takes information for card and create card element
 */
function createCard(){
    // create elements to be appended to document
    const div_card = document.createElement('div');
    const p_title = document.createElement('p');
    const p_author = document.createElement('p');
    const p_pages = document.createElement('p');
    const button_container = document.createElement('div');
    const button_edit = document.createElement('button');
    const button_remove = document.createElement('button');

    // add class names to elements
    div_card.classList.add('card');
    p_title.classList.add('title');
    p_author.classList.add('author');
    p_pages.classList.add('pages');
    button_container.classList.add('button-container');
    button_edit.classList.add('edit');
    button_remove.classList.add('remove');
    
    // add text to buttons
    button_edit.innerText = 'Edit';
    button_remove.innerText = 'Remove';

    button_container.append(button_edit, button_remove);
    div_card.appendChild(button_container);
    const book_shelf = document.querySelector('.book-shelf');
    book_shelf.appendChild(div_card);
}

const book1 = new Book('harry potter');
const book2 = new Book();
const book3 = new Book('apple');
console.log(myLibrary);
book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book2.removeBook();
book1.removeBook();
console.log(myLibrary);


// TODO: event listeners for buttons
// when clicking add book button, create a menu that enables user to enter in book info. Once done, display that book and allow that book to be delete for edited later.  