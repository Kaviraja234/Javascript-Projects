// Sample book data - in a real application, this would be fetched from a server
const BOOKS_DATA = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        year: 1960,
        color: "linear-gradient(135deg, #3498db, #2c3e50)"
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        year: 1949,
        color: "linear-gradient(135deg, #e74c3c, #c0392b)"
    },
    {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        year: 1925,
        color: "linear-gradient(135deg, #2ecc71, #27ae60)"
    },
    {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        year: 1937,
        color: "linear-gradient(135deg, #f39c12, #d35400)"
    },
    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        year: 1813,
        color: "linear-gradient(135deg, #9b59b6, #8e44ad)"
    },
    {
        id: 6,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Coming of Age",
        year: 1951,
        color: "linear-gradient(135deg, #1abc9c, #16a085)"
    },
    {
        id: 7,
        title: "Lord of the Flies",
        author: "William Golding",
        genre: "Dystopian",
        year: 1954,
        color: "linear-gradient(135deg, #d35400, #a04000)"
    },
    {
        id: 8,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Adventure",
        year: 1988,
        color: "linear-gradient(135deg, #27ae60, #229954)"
    },
    {
        id: 9,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 1997,
        color: "linear-gradient(135deg, #8e44ad, #6c3483)"
    },
    {
        id: 10,
        title: "The Hunger Games",
        author: "Suzanne Collins",
        genre: "Dystopian",
        year: 2008,
        color: "linear-gradient(135deg, #c0392b, #922b21)"
    },
    {
        id: 11,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Thriller",
        year: 2003,
        color: "linear-gradient(135deg, #2980b9, #1f618d)"
    },
    {
        id: 12,
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        genre: "Historical Fiction",
        year: 2003,
        color: "linear-gradient(135deg, #16a085, #0e6655)"
    }
];

// In a real application, this would be replaced by an actual AJAX call:
/*
function fetchBooksFromAPI() {
    return fetch('https://api.example.com/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}*/