import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          📚 Book<span>Manager</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button className="login-btn">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="welcome-text">
            WELCOME TO BOOKMANAGER
          </p>

          <h1>
            Manage Your Books
            <br />
            <span>Simply & Efficiently</span>
          </h1>

          <p className="hero-description">
            A simple and efficient book management system to
            organize, manage, and keep track of your complete
            book collection.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Explore Books →
            </button>

            <button className="outline-btn">
              Add New Book +
            </button>

          </div>

        </div>

        <div className="book-illustration">

          <div className="book-icon">
            📚
          </div>

          <h3>Your Digital Library</h3>

          <p>
            Organize your books in one place.
          </p>

        </div>

      </section>

      {/* Features Section */}
      <section className="features" id="features">

        <p className="section-label">
          FEATURES
        </p>

        <h2>
          Everything You Need to Manage Books
        </h2>

        <div className="feature-container">

          <div className="feature-card">
            <div className="feature-icon">📖</div>

            <h3>Manage Books</h3>

            <p>
              Easily add, update, view and delete books
              from your collection.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>

            <h3>Search Books</h3>

            <p>
              Quickly find books using their title,
              author or category.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Track Collection</h3>

            <p>
              Keep your complete book collection
              organized and accessible.
            </p>
          </div>

        </div>

      </section>

      {/* About Section */}
      <section className="about" id="about">

        <h2>About This Project</h2>

        <p>
          BookManager is a MERN Stack based Book Management
          System designed to provide a simple interface for
          managing books and demonstrate modern web development
          concepts.
        </p>

      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 BookManager | MERN Stack Project
        </p>
      </footer>

    </div>
  );
}

export default App;