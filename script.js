let myLibrary = [];
let delete_mode = false;

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
 * Updates display depending on option
 * @param {number} option The option to evoke.
 */
function displayLibrary(option) {
    if (option === 2)
        createCard(myLibrary[myLibrary.length - 1]);
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

    // add class names to elements
    div_card.classList.add('card');
    div_card.setAttribute('id', book.index);
    p_title.classList.add('title');
    p_author.classList.add('author');
    p_pages.classList.add('pages');
    div_status.classList.add('status');

    // add text to elements
    p_title.innerText = book.title;
    p_author.innerText = book.author;
    p_pages.innerText = book.pages
    div_status.innerText = book.status;

    // append elements to document
    div_card.append(p_title, p_author, p_pages, div_status);
    const book_shelf = document.querySelector('.book-shelf');
    book_shelf.appendChild(div_card);
}

/**
 * get the index of an object in an array
 */
const index = (id) => myLibrary.map(object => object.index).indexOf(id);

// TODO: event listeners for buttons
// when clicking add book button, create a menu that enables user to enter in book info. Once done, display that book and allow that book to be delete for edited later.  
displayLibrary(1);

/* add book button */
const open = document.getElementById('open');
const modal_container = document.getElementById('modal-container');
const submit = document.getElementById('submit');

open.onclick = () => {
    // prevent modal from showing if user is in delete mode
    if (delete_mode === true) {
        console.log('in delete mode');
    } 
    else
        modal_container.classList.add('show');
}

submit.onclick = () => {
    const title = document.getElementById('title');
    const pages = document.getElementById('pages');
    const author = document.getElementById('author');

    if (title.checkValidity() && pages.checkValidity()) {
        console.log(title.value);
        console.log(author.value);
        console.log(pages.value);
        modal_container.classList.remove('show');
        const newBook = new Book(title.value, author.value, pages.value);
        newBook.addBookToLibrary();
        displayLibrary(2);
    }
    else
        console.log('please fill in title field');
}

// trash button
const trash = document.getElementById('delete');
let delete_buttons = null;

trash.onclick = () => {
    const delete_button = document.getElementById('trash-icon');
    delete_button.src = './images/close-circle.svg';

    if (delete_mode === true) {
        delete_buttons.forEach(button => {
            button.remove();
        })
        delete_button.src = './images/delete.svg';
        delete_mode = false;
    } else {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const button = document.createElement('button');
            button.classList.add('delete');
            button.innerText = 'Delete';
            card.append(button);
        });
        console.log('what');
        delete_buttons = document.querySelectorAll('.delete');

        delete_buttons.forEach(button => {
            button.onclick = (e) => {
                let index = getCardIndex(e.target);
                let parent = getParent(e.target);
                parent.remove();
                removeBook(index);
                fixIndex();
            }
        })
        delete_mode = true;
    }
}

function getParent(child) {
    return child.parentNode;
}

function getCardIndex(childNode) {
    return childNode.parentNode.id;
}
