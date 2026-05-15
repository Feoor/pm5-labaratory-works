const fs = require('fs/promises');
const path = require('path');

const booksFile = path.join(__dirname, 'books.json');

async function checkBooks() {
  try {
    const data = await fs.readFile(booksFile, 'utf-8');
    const books = Object.values(JSON.parse(data));

    if (books.length === 0) {
      console.log('В библиотеке не обнаружено книг');
    } else {
      console.log('Книги в библиотеке:');
      books.forEach(book => {
        console.log(`- ${book.title} (${book.author}, ${book.year})`);
      })
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(booksFile, JSON.stringify({ books: [] }, null, 2));
      console.log('Файл books.json не найден. Был создан новый файл с пустой библиотекой.');

      return;
    }

    console.log('Произошла ошибка при чтении файла:', error);
  }
}

async function addBook(title, author, year) {
  try {
    const bookId = Math.random().toString(16).slice(2);

    await fs.readFile(booksFile, 'utf-8');
    const data = await fs.readFile(booksFile, 'utf-8');
    const books = JSON.parse(data);

    books[bookId] = {title: title, author: author, year: year};
    await fs.writeFile(booksFile, JSON.stringify(books, null, 2));

    console.log(`Книга "${title}" добавлена в библиотеку.`);
  } catch (error) {
    console.log('Произошла ошибка при добавлении книги:', error);
  }
}

async function findBooksByAuthor(author) {
  try {
    const data = await fs.readFile(booksFile, 'utf-8');
    const books = JSON.parse(data);

    if (books.length === 0) {
      console.log('В библиотеке не обнаружено книг');
      return;
    }

    const filteredBooks = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());

    if (filteredBooks.length === 0) {
      console.log(`Книги автора "${author}" не найдены в библиотеке.`);
    } else {
      console.log(`Книги автора "${author}":`);
      filteredBooks.forEach(book => {
        console.log(`- ${book.title} (${book.year})`);
      });
    }
  } catch (error) {
    console.log('Произошла ошибка при поиске книг по автору:', error);
  }
}

async function issueBook(id) {
  try {
    const data = await fs.readFile(booksFile, 'utf-8');
    const books = JSON.parse(data);

    if (!books[id]) {
      console.log(`Книга с ID "${id}" не найдена в библиотеке.`);
      return;
    }

    if (books[id].issued) {
      console.log(`Книга "${books[id].title}" уже выдана.`);
      return;
    }

    books[id].issued = true;
    await fs.writeFile(booksFile, JSON.stringify(books, null, 2));

    console.log(`Книга "${books[id].title}" успешно выдана.`);
  } catch (error) {
    console.log('Произошла ошибка при выдаче книги:', error);
  }
}

async function deleteOldBooks(currentYear) {
  try {
    const data = await fs.readFile(booksFile, 'utf-8');
    const books = Object.entries(JSON.parse(data));

    if (books.length === 0) {
      console.log('В библиотеке не обнаружено книг');
      return;
    }


    let newBooks = {};
    let count = 0;
    books.forEach(([id, book]) => {
      if (currentYear - book.year > 50) {
        count++;
        return;
      }

      newBooks[id] = book;
    });

    if (count === 0) {
      console.log('В библиотеке нет книг старше 50 лет.');
      return;
    }

    await fs.writeFile(booksFile, JSON.stringify(newBooks, null, 2));
    console.log(`Удалено ${count} старых книг из библиотеки.`);
  } catch (error) {
    console.log('Произошла ошибка при удалении старых книг:', error);
  }
}