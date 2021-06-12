// console.log("Welcome To Our Library");

showBooks();


// Class Book Begins Here!!!--------------------------------------------------------------------------
class Book {
    constructor(bName, aName, bGenre) {
        this.bookName = bName;
        this.authorName = aName;
        this.bookGenre = bGenre;
    }
};
// Class Book Ends Here!!!------------------------------------------------------------------------------



// Class Display Begins Here!!!--------------------------------------------------------------------------
class Display {

    // Function To Add Book Begins Here!!!---------------------------------------------
    add(book) {
        // console.log("Book has been added to library");

        let getBooks = localStorage.getItem('books');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBooks);
        }

        bookObj.push(book);
        localStorage.setItem('books', JSON.stringify(bookObj));
        // let tableBody = document.getElementById('tableBody');
        showBooks();

    }
    // Function To Add Book Ends Here!!!---------------------------------------------



    // Function To Clear Form Begins Here!!!---------------------------------------------
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    // Function To Clear Form Ends Here!!!---------------------------------------------



    // Function To Validate Books Begins Here!!!---------------------------------------------
    validate(book) {
        if (book.bookName.length < 2 || book.authorName.length < 2) {
            return false;
        } else {
            return true;
        }
    }
    // Function To Validate Books Ends Here!!!---------------------------------------------



    // Function To Display Message Begins Here!!!---------------------------------------------
    show(type, displayMessage) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong> <i class="fa fa-envelope fa-sm"></i> Message </strong> ${displayMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`;
        setTimeout(function () {
            message.innerHTML = "";
        }, 2000);

    }
    // Function To Display Message Ends Here!!!---------------------------------------------


};
// Class Display Ends Here!!!--------------------------------------------------------------------------


    // Function to Show Books Begins Here!!!-------------------------------------------------------------------
    function showBooks() {

        let getBooks = localStorage.getItem('books');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBooks);
        }
    
        let tableInfo = "";
        bookObj.forEach(function (element, index) {
            tableInfo += `<tr>
                        <td>${element.bookName}</td>
                        <td>${element.authorName}</td>
                        <td>${element.bookGenre}</td>
                        <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                      </tr>`;
        });
        let tableBody = document.getElementById('tableBody');
        if (bookObj.length == 0) {
            tableBody.innerHTML = "";
        }else{
            tableBody.innerHTML = tableInfo;
        }
    }
    
    // Function to Show Books Ends Here!!!---------------------------------------------------------------------


//----------- Function To Delete Books Starts Here!!!!-----------------------------------------------------
function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let bookName = bookObj[index].name;
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>:<i class="fa fa-trash fa-sm"></i> </strong> The book ${bookName} has been deleted from the library
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = "";
    }, 2000);
    showBooks();
}
//----------- Function To Delete Books Starts Here!!!!-----------------------------------------------------


// Get the libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

// Function to Submit Library Form Begins Here!!!! -----------------------------------------------------
function libraryFormSubmit(e) {

    e.preventDefault();
    let bookName = document.getElementById('bookName').value;
    let authorName = document.getElementById('authorName').value;
    let bookGenre;
    let sFiction = document.getElementById('sFiction');
    let cProgramming = document.getElementById('cProgramming');
    let cArts = document.getElementById('cArts');
    if (sFiction.checked) {
        bookGenre = sFiction.value;
    } else if (cProgramming.checked) {
        bookGenre = cProgramming.value;
    } else if (cArts.checked) {
        bookGenre = cArts.value;
    }

let book = new Book(bookName, authorName, bookGenre);
let display = new Display();

if(display.validate(book)){
    display.add(book);
    display.clear();
    display.show('success', 'The Book Has Been Successfully Added to Our Library');
} else {
    display.show('danger', 'Sorry !!! Cannot Add The Book You are Trying to. ');
};

};
// Function to Submit Library Form Ends Here!!!! -----------------------------------------------------

