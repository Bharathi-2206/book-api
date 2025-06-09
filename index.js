const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'To kill a mocking bird', author: 'Harper lee' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R.Tolkien' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;
  let found = false;

  books = books.map(book => {
    if (book.id === id) {
      found = true;
      return { id, ...updatedBook };
    }
    return book;
  });

  found ? res.json({ message: 'Book updated' }) : res.status(404).json({ error: 'Book not found' });
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = books.length;
  books = books.filter(book => book.id !== id);

  if (books.length < originalLength) {
    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
