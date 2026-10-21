
import { useState } from "react";
import "./Books.css";

const sampleBooks = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", price: 299 },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-Help", price: 399 },
  { id: 3, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", category: "Biography", price: 250 },
  { id: 4, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", price: 350 },
  { id: 5, title: "The Power of Your Subconscious Mind", author: "Joseph Murphy", category: "Self-Help", price: 275 },
  { id: 6, title: "Ikigai", author: "Hector Garcia", category: "Lifestyle", price: 320 },
];

function Books() {
  const [books, setBooks] = useState(sampleBooks);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
  });

  const handleAddBook = (event) => {
    event.preventDefault();

    const book = {
      id: Date.now(),
      title: newBook.title.trim(),
      author: newBook.author.trim(),
      category: newBook.category.trim(),
      price: Number(newBook.price),
    };

    setBooks((previousBooks) => [...previousBooks, book]);
    setNewBook({ title: "", author: "", category: "", price: "" });
    setShowForm(false);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((previousBooks) =>
        previousBooks.filter((book) => book.id !== id)
      );
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.category.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="books-page">
      <header className="books-header">
        <div>
          <p className="books-label">YOUR COLLECTION</p>
          <h1>Explore Books</h1>
          <p className="books-subtitle">
            Discover and manage your favourite books in one place.
          </p>
        </div>
        <div className="books-count">
          <span>{filteredBooks.length}</span>
          <p>Books Found</p>
        </div>
      </header>

      <section className="books-toolbar">
        <div className="books-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button
          className="add-book-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add New Book"}
        </button>
      </section>

      {showForm && (
        <form className="add-book-form" onSubmit={handleAddBook}>
          <h2>Add a New Book</h2>
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(event) =>
              setNewBook({ ...newBook, title: event.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Author Name"
            value={newBook.author}
            onChange={(event) =>
              setNewBook({ ...newBook, author: event.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newBook.category}
            onChange={(event) =>
              setNewBook({ ...newBook, category: event.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Price (₹)"
            min="0"
            step="0.01"
            value={newBook.price}
            onChange={(event) =>
              setNewBook({ ...newBook, price: event.target.value })
            }
            required
          />
          <button type="submit" className="add-book-btn">
            Save Book
          </button>
        </form>
      )}

      {filteredBooks.length > 0 ? (
        <section className="books-grid">
          {filteredBooks.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="book-cover">
                <span>📚</span>
                <span className="book-category">{book.category}</span>
              </div>

              <div className="book-info">
                <h2>{book.title}</h2>
                <p className="book-author">By {book.author}</p>

                <div className="book-card-footer">
                  <span className="book-price">₹{book.price}</span>

                  <div className="book-actions">
                    <button
                      className="view-book-btn"
                      onClick={() =>
                        alert(`Book: ${book.title}\nAuthor: ${book.author}`)
                      }
                    >
                      View Details →
                    </button>

                    <button
                      className="delete-book-btn"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="no-books">
          <span>🔎</span>
          <h2>No books found</h2>
          <p>Try searching with a different title or author.</p>
        </div>
      )}
    </div>
  );
}

export default Books;
