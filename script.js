let myLibrary = [];
let delete_mode = false;
let delete_buttons = null;
const trash = document.getElementById('delete');
let readButtons = null;

function Book(title = '', author = '', pages = '', status) {
    let index = null;
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


/**
 * remove Book from array 
*/
function removeBook(target) {
    myLibrary = myLibrary.filter(book => book.index != target);
    fixIndex();
}

/**
 * fix index values of book objects in array and div#id
 */
function fixIndex() {
    console.log('entering fixIndex()');
    for (let i = 0; i < myLibrary.length; i++) {
        let target = document.getElementById(myLibrary[i].index);
        target.id = i;
        myLibrary[i].index = i;
    }
}

/**
 * Updates display depending on option
 * @param {number} option The option to evoke.
 */
function displayLibrary() {
    createCard(myLibrary[myLibrary.length - 1]);
    readButtons = document.querySelectorAll('.status');
    readButtons.forEach(button => {
        button.onclick = (e) => {
            let cardIndex = getCardIndex(e.target);
            let currentStatus = (myLibrary[cardIndex].status);
            if(currentStatus === 'Read')
                myLibrary[cardIndex].status = 'Not read';
            else
                myLibrary[cardIndex].status = 'Read';
            button.innerText = myLibrary[cardIndex].status;
        }
    })
}


/**
 * takes information for card and create card element
 */
function createCard(book) {
    // create elements to be appended to document
    const div_card = document.createElement('div');div_card.setAttribute('id', book.index);
    const p_title = document.createElement('p');
    const p_author = document.createElement('p');
    const p_pages = document.createElement('p');
    const button_status = document.createElement('button');

    // add class names to elements
    div_card.classList.add('card');
    p_title.classList.add('title');
    p_author.classList.add('author');
    p_pages.classList.add('pages');
    button_status.classList.add('status');

    // add text to elements
    p_title.innerText = book.title;
    p_author.innerText = book.author;
    p_pages.innerText = book.pages
    button_status.innerText = book.status;

    // append elements to document
    div_card.append(p_title, p_author, p_pages, button_status);
    const book_shelf = document.querySelector('.book-shelf');
    book_shelf.appendChild(div_card);
}

// TODO: event listeners for buttons
// when clicking add book button, create a menu that enables user to enter in book info. Once done, display that book and allow that book to be delete for edited later.  

/* add book button */
const open = document.getElementById('open');
const modal_container = document.getElementById('modal-container');
const addBook = document.getElementById('add');

open.onclick = () => {
    // prevent modal from showing if user is in delete mode
    if (delete_mode === true) {
        alert('Please close out of delete mode.');
    } 
    else
        modal_container.classList.add('show');
}

addBook.onclick = () => {
    const title = document.getElementById('title');
    const pages = document.getElementById('pages');
    const author = document.getElementById('author');
    const status = document.getElementById('status');

    let readStatus = status.checked ? 'Read' : 'Not read';

    if (title.checkValidity() && pages.checkValidity()) {
        const newBook = new Book(title.value, author.value, pages.value, readStatus);
        newBook.addBookToLibrary();
        modal_container.classList.remove('show');
        displayLibrary();
    }
    else 
        alert('Title field is required.\nNumber of pages must be a value greater than 1, otherwise leave blank.')
}

// close modal with esc key
document.addEventListener('keydown',(e) => {
    if(e.key === "Escape") {
        modal_container.classList.remove('show');
        console.log('close modal');
    }
})

// close modal when clicking outside of modal box
modal_container.onclick = (e) => {
    if (e.target.id === 'modal-container')
        modal_container.classList.remove('show');
}

// trash button


trash.onclick = () => {
    const trash_button = document.getElementById('trash-icon');
    trash_button.src = './images/close-circle.svg';

    if (delete_mode === true) {
        delete_buttons.forEach(button => {
            button.remove();
        })
        trash_button.src = './images/delete.svg';
        delete_mode = false;
    } else {
        delete_mode = true;
        // append a delete button to each card
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const button = document.createElement('button');
            button.classList.add('delete');
            button.innerText = 'Delete';
            card.appendChild(button);
        });
        delete_buttons = document.querySelectorAll('.delete');
        delete_buttons.forEach(button => {
            button.onclick = (e) => {
                let cardIndex = getCardIndex(e.target);
                let parent = getParent(e.target);
                parent.remove();
                removeBook(cardIndex);
            }
        })
    }
}

/**
 * Gets the pointer to a parent node.
 * @param {object} child the child of the parent node
 * @returns the parent of the child node
 */
function getParent(child) {
    return child.parentNode;
}

/**
 * Gets the index value of the card that is targeted. 
 * @param {object} childNode the current node that is clicked on
 * @returns the id value of the parent of this current node
 */
function getCardIndex(childNode) {
    return childNode.parentNode.id;
}

