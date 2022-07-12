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
 * remove Book from array 
*/
Book.prototype.removeBook = function() {
    myLibrary = myLibrary.filter(bookObj => bookObj != this);
}

/**
 * change read status of Book
 */
Book.prototype.changeStatus = function (status) {
    this.status = status;
}

/**
 * iterates through array and displays each element
 */
function displayLibrary(){

}

/**
 * Brings popup menu where current book info is displayed and can be modified
 */
Book.prototype.editBook = function() {

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