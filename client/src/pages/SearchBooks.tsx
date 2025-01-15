import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { searchGoogleBooks } from '../utils/API';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

function SearchBooks() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink,
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      const { data } = await saveBook({
        variables: { input: bookToSave },
      });

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      saveBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>Search for Books</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search for a book"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Submit Search</button>
        </form>
      </div>
      <div>
        {searchedBooks.map((book) => (
          <div key={book.bookId}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <button
              disabled={savedBookIds.includes(book.bookId)}
              onClick={() => handleSaveBook(book.bookId)}
            >
              {savedBookIds.includes(book.bookId)
                ? 'Book Already Saved'
                : 'Save This Book!'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchBooks;
