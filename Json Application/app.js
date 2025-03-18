// Book data in JSON format
const booksJSON = `[
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": 1925,
        "genre": "Fiction",
        "pages": 180,
        "description": "A novel about the decadence and excess of the Jazz Age, following the mysterious millionaire Jay Gatsby."
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "year": 1960,
        "genre": "Classic",
        "pages": 281,
        "description": "A story about racial injustice and moral growth in the American South during the 1930s."
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "year": 1949,
        "genre": "Dystopian",
        "pages": 328,
        "description": "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of life."
    },
    {
        "title": "Brave New World",
        "author": "Aldous Huxley",
        "year": 1932,
        "genre": "Dystopian",
        "pages": 311,
        "description": "A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy."
    },
    {
        "title": "Fahrenheit 451",
        "author": "Ray Bradbury",
        "year": 1953,
        "genre": "Science Fiction",
        "pages": 249,
        "description": "A novel about a future American society where books are outlawed and 'firemen' burn any that are found."
    }
]`;

// Parse JSON data
const books = JSON.parse(booksJSON);
const bookListElement = document.getElementById('bookList');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');

// Display all books initially
displayBooks(books);

// Add event listeners
searchButton.addEventListener('click', filterBooks);
resetButton.addEventListener('click', resetFilters);

// Filter books based on search input and genre
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                              book.author.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    displayBooks(filteredBooks);
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    genreFilter.value = '';
    displayBooks(books);
}

// Display the provided books
function displayBooks(booksToDisplay) {
    bookListElement.innerHTML = '';

    if (booksToDisplay.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No books match your search criteria.';
        bookListElement.appendChild(noResults);
        return;
    }

    booksToDisplay.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';

        const titleElement = document.createElement('div');
        titleElement.className = 'book-title';
        titleElement.textContent = book.title;

        const authorElement = document.createElement('div');
        authorElement.className = 'book-author';
        authorElement.textContent = `by ${book.author}`;

        const detailsElement = document.createElement('div');
        detailsElement.className = 'book-details';
        detailsElement.innerHTML = `
            <span>Year: ${book.year}</span>
            <span>Genre: ${book.genre}</span>
            <span>Pages: ${book.pages}</span>
        `;

        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'book-description';
        descriptionElement.textContent = book.description;

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(detailsElement);
        bookElement.appendChild(descriptionElement);

        bookListElement.appendChild(bookElement);
    });
}