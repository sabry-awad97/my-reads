import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from '../typings';
import { BookShelf } from './BookShelf';

interface Props {
  shelves: Map<string, IBook[]>;
  updateShelf(book: IBook, shelf: string): void;
}

export const BookShelves: FC<Props> = ({ shelves, updateShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>Book Shelves</h1>
      </div>
      {[...shelves.entries()].map(([shelfTitle, books], index) => (
        <BookShelf
          updateShelf={updateShelf}
          key={index}
          title={shelfTitle}
          books={books}
        />
      ))}
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
