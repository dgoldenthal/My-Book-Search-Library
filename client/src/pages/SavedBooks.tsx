import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

import Auth from '../utils/auth';

function SavedBooks() {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId },
        update: (cache) => {
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...me,
                savedBooks: me.savedBooks.filter((book) => book.bookId !== bookId),
              },
            },
          });
        },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-center">
        <h1>Viewing {userData.username}'s Saved Books!</h1>
      </div>
      <div>
        {userData.savedBooks.map((book) => (
          <div key={book.bookId}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <button onClick={() => handleDeleteBook(book.bookId)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SavedBooks;
