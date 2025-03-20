function Book(author, title, totalPages) {
  this.author = author;
  this.title = title;
  this.totalPages = totalPages;
  this.read = false;
  this.id = crypto.randomUUID();
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
Book.prototype.createBookElements = function () {
  const elements = {
    bookContainer: {
      className: "book-container",
      tag: "div",
      dataset: { id: this.id },
    },
    authorParagraph: {
      tag: "p",
      appendTo: "bookContainer",
      textContent: this.author,
    },
    titleParagraph: {
      tag: "p",
      appendTo: "bookContainer",
      textContent: this.title,
    },
    totalPagesParagraph: {
      tag: "p",
      appendTo: "bookContainer",
      textContent: this.totalPages,
    },
    deleteBookButton: {
      tag: "button",
      className: "delete-book",
      textContent: "Remove",
      appendTo: "bookContainer",
    },
    toggleRead: {
      tag: "label",
      className: "toggle-read",
      dataset: { readState: "false" },
      appendTo: "bookContainer",
    },
    toggleInput: {
      tag: "input",
      className: "toggle-read-input",
      setAttribute: { type: "checkbox" },
      appendTo: "toggleRead",
    },
    toggleText: {
      tag: "span",
      textContent: this.read ? "Read" : "Unread",
      appendTo: "toggleRead",
    },
  };
  Object.entries(elements).forEach(
    ([
      elementName,
      { tag, className, dataset, appendTo, textContent, setAttribute },
    ]) => {
      this[elementName] = document.createElement(tag);
      this[elementName].classList.add(className);
      if (dataset) {
        Object.entries(dataset).forEach(([key, value]) => {
          this[elementName].dataset[key] = value;
        });
      }
      if (setAttribute) {
        Object.entries(setAttribute).forEach(([key, value]) => {
          this[elementName].setAttribute(key, value);
        });
      }
      if (appendTo) {
        this[appendTo].appendChild(this[elementName]);
      }
      if (textContent) {
        this[elementName].textContent = textContent;
      }
    }
  );
};

function LibraryApp() {
  this.myLibrary = [];
}
LibraryApp.prototype.initializeApp = function () {
  this.selectElements();
  this.setModalEvents();
  this.setFormEvent();
  this.addToggleReadEvent();
  this.addDeleteBookEvent();
};
LibraryApp.prototype.selectElements = function () {
  this.booksContainer = document.querySelector(".books-container");
  this.addBookButton = document.querySelector(".addBook");
  this.addBookModal = document.querySelector(".addBookModal");
  this.closeAddBookModal = document.querySelector(".closeAddBookModal");
  this.bookForm = document.querySelector(".bookForm");
  this.authorInput = document.querySelector("#author");
  this.titleInput = document.querySelector("#title");
  this.totalPagesInput = document.querySelector("#totalPages");
};
LibraryApp.prototype.setModalEvents = function () {
  this.addBookButton.addEventListener("click", () =>
    this.addBookModal.showModal()
  );
  this.closeAddBookModal.addEventListener("click", () =>
    this.addBookModal.close()
  );
};
LibraryApp.prototype.addBookToLibrary = function (author, title, totalPages) {
  const newBook = new Book(author, title, totalPages);
  newBook.createBookElements();

  this.myLibrary.push(newBook);
  this.renderBooks("add");
};
LibraryApp.prototype.addToggleReadEvent = function () {
  this.booksContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("toggle-read-input")) {
      const bookElementId = e.target.closest(".book-container").dataset.id;
      const foundBook = this.myLibrary.find(
        (book) => book.id === bookElementId
      );
      if (foundBook) {
        foundBook.read = !foundBook.read;
        foundBook.toggleText.textContent = foundBook.read ? "Read" : "Unread";
      }
    }
  });
};
LibraryApp.prototype.addDeleteBookEvent = function () {
  this.booksContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete-book")) {
      const parent = e.target.parentElement;
      this.myLibrary = [
        ...this.myLibrary.filter((book) => book.id !== parent.dataset.id),
      ];
      this.renderBooks();
    }
  });
};
LibraryApp.prototype.renderBooks = function (type) {
  const library = this.myLibrary;
  if (type === "add") {
    this.booksContainer.appendChild(library[library.length - 1].bookContainer);
  } else {
    this.booksContainer.innerHTML = "";
    library.forEach((book) => {
      this.booksContainer.appendChild(book.bookContainer);
    });
  }
};
LibraryApp.prototype.setFormEvent = function () {
  this.bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    this.addBookToLibrary(
      this.authorInput.value,
      this.titleInput.value,
      this.totalPagesInput.value
    );
    this.authorInput.value = "";
    this.titleInput.value = "";
    this.totalPagesInput.value = "";
    this.addBookModal.close();
  });
};

const libraryApp = new LibraryApp();
libraryApp.initializeApp();
