let myLibrary = [];
let remove_buttons = null;

// constructor
function Book(title = '', author = '', pages = '', status = 'not read') {
    const index = null;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

/**
 * add Book to array and set its index property
 */
Book.prototype.addBookToLibrary = function () {
    this.index = myLibrary.length;
    myLibrary.push(this);
}

/**
 * change read status of Book
 */
Book.prototype.changeStatus = function (status) {
    if (status === 'read')
        this.status = 'not read';
    else
        this.status = 'read';
}

/**
 * Brings popup menu where current book info is displayed and can be modified
 */
Book.prototype.editBook = function () {

}

/**
 * remove Book from array 
*/
function removeBook(index) {
    myLibrary = myLibrary.filter(book => book.index != index);
    fixIndex();
    console.log(myLibrary);
}

/**
 * fix index values of book objects in array and div#id
 */
function fixIndex() {
    for (let i = 0; i < myLibrary.length; i++) {
        const target = document.getElementById(myLibrary[i].index);
        target.id = i;
        myLibrary[i].index = i;
    }
}

/**
 * iterates through array and displays each element
 */
function displayLibrary() {
    myLibrary.forEach(book => {
        createCard(book);
    });
    remove_buttons = document.querySelectorAll('button.remove');
}

/**
 * display new book
 */
function updateDisplay() {
    createCard(myLibrary[myLibrary.length - 1]);
    remove_buttons = document.querySelectorAll('button.remove');
}

/**
 * takes information for card and create card element
 */
function createCard(book) {
    // create elements to be appended to document
    const div_card = document.createElement('div');
    const p_title = document.createElement('p');
    const p_author = document.createElement('p');
    const p_pages = document.createElement('p');
    const div_status = document.createElement('div');
    const button_container = document.createElement('div');
    const button_edit = document.createElement('button');
    const button_remove = document.createElement('button');

    // add class names to elements
    div_card.classList.add('card');
    div_card.setAttribute('id', book.index);
    p_title.classList.add('title');
    p_author.classList.add('author');
    p_pages.classList.add('pages');
    div_status.classList.add('status');
    button_container.classList.add('button-container');
    button_edit.classList.add('edit');
    button_remove.classList.add('remove');

    // add text to elements
    p_title.innerText = book.title;
    p_author.innerText = book.author;
    p_pages.innerText = book.pages
    div_status.innerText = book.status;
    button_edit.innerText = 'Edit';
    button_remove.innerText = 'Remove';

    // append elements to document
    button_container.append(button_edit, button_remove);
    div_card.append(p_title, p_author, p_pages, div_status, button_container);
    const book_shelf = document.querySelector('.book-shelf');
    book_shelf.appendChild(div_card);
}

/**
 * get the index of an object in an array
 */
const index = (id) => myLibrary.map(object => object.index).indexOf(id);

// TODO: event listeners for buttons
// when clicking add book button, create a menu that enables user to enter in book info. Once done, display that book and allow that book to be delete for edited later.  
displayLibrary();

remove_buttons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.closest('.card');
        const targetID = target.id;
        target.remove();

        // TODO: remove book from myLibrary
        const index = parseInt(targetID);
        removeBook(index);
    })
});

// modal interactions
const open = document.getElementById('open');
const modal_container = document.getElementById('modal-container');
const submit = document.getElementById('submit');

open.onclick = () => {
    modal_container.classList.add('show');
}

submit.onclick = () => {
    const title = document.getElementById('title');
    const pages = document.getElementById('pages');
    const author = document.getElementById('author');

    if(title.checkValidity() && pages.checkValidity() ){
        console.log(title.value);
        console.log(author.value);
        console.log(pages.value);
        modal_container.classList.remove('show');
        const newBook = new Book(title.value, author.value, pages.value);
        newBook.addBookToLibrary();
        updateDisplay();
    }
    else
        console.log('please fill in title field');
}