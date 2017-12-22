class Book {

    constructor(name, number, price) {
        this.name = name;
        this.number = number;
        this.price = price;
    }

}

class UI {
    addBook(book) {
        tbody.innerHTML += `
        <tr>
            <td>${book.name}</td>
            <td>${book.number}</td>
            <td>${book.price}</td>
            <td class="deleteItem">X</td>
        </tr>
    `;

        if (localStorage.getItem('books') !== null) {
            let books = getBooksFromLS();
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        } else {
            let books = [];
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }
    }

    deleteItem(e) {
        if (e.target.classList.contains('deleteItem')) {
            e.target.parentElement.remove();
            console.log(e);

            let books = getBooksFromLS();
            books.forEach((book) => {
                if (book.number == e.target.previousElementSibling.previousElementSibling.textContent) {
                    let bookToDelete = book;
                    books.splice(book, 1);
                    localStorage.setItem('books', JSON.stringify(books));
                }
            })
        }
    }

    showAlert(msg, status) {
        const div = document.createElement('div');
        div.className = `alert ${status}`;
        div.append(document.createTextNode(msg));

        const elem = document.querySelector('.container');
        elem.insertBefore(div, document.querySelector('form'));
    }

    clearFields() {
        document.getElementById('bookName').value = '';
        document.getElementById('bookNumber').value = '';
        document.getElementById('price').value = '';
    }

    clearList() {
        localStorage.clear();
        tbody.innerHTML = '';
    }

    removeAlert() {
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

const tbody = document.querySelector('tbody');
const submitBtn = document.querySelector('#submitListBtn');
const clearList = document.getElementById('clearList');


document.addEventListener('DOMContentLoaded', function () {

    let books = getBooksFromLS();

    showBooks(books);


})

function getBooksFromLS() {

    let books;

    if (localStorage.getItem('books') == null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
}

function showBooks(books) {
    books.forEach((book, index) => {
        tbody.innerHTML += `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.number}</td>
                    <td>${book.price}</td>
                    <td class="deleteItem">X</td>
                </tr>
            `;
    })
}

submitBtn.addEventListener('submit', function (e) {
    e.preventDefault();

    const bookName = document.getElementById('bookName').value,
        bookNumber = document.getElementById('bookNumber').value,
        price = document.getElementById('price').value;

    const book = new Book(bookName, bookNumber, price);
    console.log(book);
    const ui = new UI();

    if (bookName == undefined || bookNumber == '' || price == '') {
        ui.showAlert('Please fill out the form fields', 'error');
        ui.removeAlert();
    } else {
        ui.addBook(book);
        ui.clearFields();
        ui.showAlert('Book added successfully', 'success');
        ui.removeAlert();
    }

});

tbody.addEventListener('click', function (e) {

    const ui = new UI();
    ui.deleteItem(e);

});

clearList.addEventListener('click', function (e) {

    const ui = new UI();
    ui.clearList();

})