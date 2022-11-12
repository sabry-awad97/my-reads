import { capitalCase } from "change-case";
import { FC } from "react";

import { compareFunction } from "../helpers/compareFunction";
import { IBook } from "../typings";
import { Book } from "./Book";

interface Props {
  books: IBook[];
  title: string;
  updateShelf(book: IBook, shelf: string): void;
}

export const BookShelf: FC<Props> = ({ title, books, updateShelf }) => {
  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <h2 className="bookshelf-title">{capitalCase(title)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.sort(compareFunction("title")).map(book => (
              <li key={book.id}>
                <Book updateShelf={updateShelf} book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
