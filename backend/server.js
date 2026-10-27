
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory book data
let books = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    status: "Available",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    status: "Issued",
  },
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Book Management System API is running",
    status: "success",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend server is working properly",
  });
});

// Get all books
app.get("/api/books", (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books,
  });
});

// Get one book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  res.json({ success: true, data: book });
});

// Add a new book
app.post("/api/books", (req, res) => {
  const { title, author, category, status } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof author !== "string" ||
    !author.trim() ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Title, author and category are required",
    });
  }

  const validStatuses = ["Available", "Issued"];

  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be Available or Issued",
    });
  }

  const newBook = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(),
    author: author.trim(),
    category: category.trim(),
    status: status || "Available",
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: newBook,
  });
});

// Update a book
app.put("/api/books/:id", (req, res) => {
  const index = books.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  const { title, author, category, status } = req.body;
  const updatedBook = { ...books[index] };

  for (const [field, value] of Object.entries({
    title,
    author,
    category,
  })) {
    if (value !== undefined) {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a non-empty string`,
        });
      }

      updatedBook[field] = value.trim();
    }
  }

  if (status !== undefined) {
    if (!["Available", "Issued"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Available or Issued",
      });
    }

    updatedBook.status = status;
  }

  books[index] = updatedBook;

  res.json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

// Delete a book
app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json({
    success: true,
    message: "Book deleted successfully",
    data: deletedBook,
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  next(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
