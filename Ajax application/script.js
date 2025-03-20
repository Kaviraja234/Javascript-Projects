// Main app controller
const BookApp = {
    books: [],
    filteredBooks: [],
    
    init: function() {
        this.bookGrid = document.getElementById('book-grid');
        this.searchInput = document.getElementById('search-input');
        this.genreFilter = document.getElementById('genre-filter');
        this.authorFilter = document.getElementById('author-filter');
        this.yearFilter = document.getElementById('year-filter');
        
        this.fetchBooks();
        this.setupEventListeners();
    },
    
    fetchBooks: function() {
        // Simulate an AJAX request with setTimeout
        setTimeout(() => {
            // In a real application, you would use:
         /*   
            fetchBooksFromAPI()
                .then(data => {
                    this.processBookData(data);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                    this.bookGrid.innerHTML = '<div class="no-results"><h3>Error</h3><p>Failed to load books. Please try again later.</p></div>';
                });
            */
            
            // For now, use the sample data from books-data.js
            this.processBookData(BOOKS_DATA);
            
        }, 1000); // Simulate network delay
    },
    
    processBookData: function(data) {
        this.books = data;
        this.filteredBooks = [...this.books];
        this.populateFilters();
        this.renderBooks();
    },
    
    populateFilters: function() {
        // Get unique genres
        const genres = [...new Set(this.books.map(book => book.genre))].sort();
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            this.genreFilter.appendChild(option);
        });
        
        // Get unique authors
        const authors = [...new Set(this.books.map(book => book.author))].sort();
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            this.authorFilter.appendChild(option);
        });
        
        // Get unique years
        const years = [...new Set(this.books.map(book => book.year))].sort((a, b) => b - a);
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.yearFilter.appendChild(option);
        });
    },
    
    renderBooks: function() {
        this.bookGrid.innerHTML = '';
        
        if (this.filteredBooks.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = '<h3>No books found</h3><p>Try adjusting your filters or search terms</p>';
            this.bookGrid.appendChild(noResults);
            return;
        }
        
        this.filteredBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            // Create initial of book title for cover
            const initials = book.title
                .split(' ')
                .slice(0, 2)
                .map(word => word.charAt(0))
                .join('');
            
            bookCard.innerHTML = `
                <div class="book-cover">
                    <div class="cover-gradient" style="background: ${book.color}">${initials}</div>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <div class="book-author">by ${book.author}</div>
                    <div class="book-details">
                        <span class="book-genre">${book.genre}</span>
                        <span class="book-year">${book.year}</span>
                    </div>
                </div>
            `;
            
            this.bookGrid.appendChild(bookCard);
        });
    },
    
    applyFilters: function() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedGenre = this.genreFilter.value;
        const selectedAuthor = this.authorFilter.value;
        const selectedYear = this.yearFilter.value;
        
        this.filteredBooks = this.books.filter(book => {
            // Check if book matches the search term
            const matchesSearch = 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm);
            
            // Check if book matches all selected filters
            const matchesGenre = !selectedGenre || book.genre === selectedGenre;
            const matchesAuthor = !selectedAuthor || book.author === selectedAuthor;
            const matchesYear = !selectedYear || book.year.toString() === selectedYear;
            
            return matchesSearch && matchesGenre && matchesAuthor && matchesYear;
        });
        
        this.renderBooks();
    },
    
    setupEventListeners: function() {
        // Set up event listeners for filtering
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.genreFilter.addEventListener('change', () => this.applyFilters());
        this.authorFilter.addEventListener('change', () => this.applyFilters());
        this.yearFilter.addEventListener('change', () => this.applyFilters());
    }
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    BookApp.init();
});