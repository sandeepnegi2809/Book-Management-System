
import { useState } from "react";
import "./App.css";

const initialBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", category: "Self Development", status: "Available" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "Available" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", category: "Technology", status: "Issued" },
  { id: 4, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", status: "Available" },
  { id: 5, title: "Deep Work", author: "Cal Newport", category: "Productivity", status: "Available" },
];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    status: "Available",
  });

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openAddForm() {
    setEditingId(null);
    setForm({ title: "", author: "", category: "Fiction", status: "Available" });
    setShowForm(true);
  }

  function openEditForm(book) {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      status: book.status,
    });
    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const author = form.author.trim();

    if (!title || !author) return;

    if (editingId !== null) {
      setBooks((current) =>
        current.map((book) =>
          book.id === editingId
            ? { ...book, ...form, title, author }
            : book
        )
      );
    } else {
      setBooks((current) => [
        { ...form, title, author, id: Date.now() },
        ...current,
      ]);
    }

    setShowForm(false);
  }

  function deleteBook(id) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((current) => current.filter((book) => book.id !== id));
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">B</div>
          <div>
            <h2>BookNest</h2>
            <span>MANAGEMENT SYSTEM</span>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>
        <button className="nav-item active">
          <span>▦</span> Dashboard
        </button>
        <button className="nav-item" onClick={openAddForm}>
          <span>＋</span> Add a book
        </button>

        <div className="sidebar-bottom">
          <div className="profile-avatar">SN</div>
          <div>
            <strong>Administrator</strong>
            <span>Library Manager</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Book Dashboard</h1>
          </div>
          <div className="topbar-right">
            <span className="online-dot"></span>
            <span>Library overview</span>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR LIBRARY, ORGANIZED</p>
            <h2>Manage your collection.</h2>
            <p>Keep track of books, authors and availability in one place.</p>
          </div>
          <div className="book-illustration" aria-hidden="true">▤</div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon purple">▤</div>
            <p>Total Books</p>
            <h2>{books.length}</h2>
            <span>Books in collection</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Available</p>
            <h2>{books.filter((b) => b.status === "Available").length}</h2>
            <span>Ready to borrow</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon orange">↗</div>
            <p>Issued Books</p>
            <h2>{books.filter((b) => b.status === "Issued").length}</h2>
            <span>Currently issued</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon blue">⌕</div>
            <p>Categories</p>
            <h2>{new Set(books.map((b) => b.category)).size}</h2>
            <span>Different subjects</span>
          </article>
        </section>

        <section className="library-section">
          <div className="section-heading">
            <div>
              <h2>Book Collection</h2>
              <p>Browse and manage your library inventory.</p>
            </div>
            <button className="primary-button" onClick={openAddForm}>
              + Add New Book
            </button>
          </div>

          <div className="table-toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search by title, author or category..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <span className="result-count">
              {filteredBooks.length} books found
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>BOOK TITLE</th>
                  <th>AUTHOR</th>
                  <th>CATEGORY</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <div className="book-cell">
                        <div className="mini-book">▤</div>
                        <strong>{book.title}</strong>
                      </div>
                    </td>
                    <td>{book.author}</td>
                    <td><span className="category-tag">{book.category}</span></td>
                    <td>
                      <span className={`status-tag ${book.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        {book.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-button" onClick={() => openEditForm(book)}>
                          Edit
                        </button>
                        <button className="delete-button" onClick={() => deleteBook(book.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBooks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No books found. Try another search or add a new book.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="table-footer">Showing {filteredBooks.length} of {books.length} books</p>
        </section>

        <footer className="footer">
          <span>BookNest · Book Management System</span>
          <span>Built with React · Day 1</span>
        </footer>
      </main>

      {showForm && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowForm(false);
        }}>
          <section className="book-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-heading">
              <div>
                <h2 id="modal-title">{editingId !== null ? "Edit Book" : "Add New Book"}</h2>
                <p>Enter the book information below.</p>
              </div>
              <button className="close-button" onClick={() => setShowForm(false)} aria-label="Close form">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Book Title *
                <input
                  required
                  maxLength={120}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter book title"
                />
              </label>
              <label>
                Author *
                <input
                  required
                  maxLength={100}
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Enter author's name"
                />
              </label>
              <label>
                Category
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Fiction</option>
                  <option>Technology</option>
                  <option>Self Development</option>
                  <option>Finance</option>
                  <option>Productivity</option>
                  <option>Education</option>
                  <option>History</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Availability
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Available</option>
                  <option>Issued</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-button">
                  {editingId !== null ? "Save Changes" : "Add Book"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
