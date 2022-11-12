import { FC } from 'react';
import { IBook } from '../typings';

interface Props {
  book: IBook;
  updateShelf(book: IBook, shelf: string): void;
}

export const Book: FC<Props> = ({ book, updateShelf }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${
              book.imageLinks?.smallThumbnail ||
              'https://via.placeholder.com/128x193'
            }")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={event => updateShelf(book, event.target.value)}
            defaultValue={book.shelf || 'none'}
          >
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(', ')}</div>
    </div>
  );
};
