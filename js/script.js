let myLibrary = [];

function Book(author, title, totalPages) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.totalPages = totalPages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title, totalPages) {
  // take params, create a book then store it in the array

  const newBook = new Book(author, title, totalPages);
  myLibrary.push(newBook);
}

console.log(myLibrary);
const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector(".addBook");
const addBookModal = document.querySelector(".addBookModal");
const closeAddBookModal = document.querySelector(".closeAddBookModal");
const bookForm = document.querySelector(".bookForm");
addBookButton.addEventListener("click", () => addBookModal.showModal());
closeAddBookModal.addEventListener("click", () => addBookModal.close());

renderBooksContainerContent();
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const authorInput = document.querySelector("#author");
  const titleInput = document.querySelector("#title");
  const totalPagesInput = document.querySelector("#totalPages");
  addBookToLibrary(authorInput.value, titleInput.value, totalPagesInput.value);
  authorInput.value = "";
  titleInput.value = "";
  totalPagesInput.value = "";
  renderBooksContainerContent();
  addBookModal.close();
});
booksContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete-book")) {
    const parent = e.target.parentElement;
    myLibrary = [...myLibrary.filter((book) => book.id !== parent.dataset.id)];
  }
  renderBooksContainerContent();
});
function renderBooksContainerContent() {
  if (!myLibrary.length) {
    booksContainer.innerHTML = `<p>No books added yet</p>`;
  } else {
    booksContainer.innerHTML = "";
    for (let book of myLibrary) {
      const bookContainer = document.createElement("div");
      const authorParagraph = document.createElement("p");
      authorParagraph.textContent = book.author;
      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = book.title;
      const totalPagesParagraph = document.createElement("p");
      totalPagesParagraph.textContent = book.totalPages;
      const deleteBookButton = document.createElement("button");
      deleteBookButton.classList.add("delete-book");
      deleteBookButton.textContent = "Remove";
      bookContainer.append(
        authorParagraph,
        titleParagraph,
        totalPagesParagraph,
        deleteBookButton
      );
      bookContainer.classList.add("book-container");
      bookContainer.dataset.id = book.id;
      booksContainer.appendChild(bookContainer);
    }
  }
}
