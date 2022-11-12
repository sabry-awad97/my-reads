import { FC } from "react";
import { compareFunction } from "../helpers/compareFunction";
import { IBook } from "../typings";
import { Book } from "./Book";

interface Props {
  books: IBook[];
  updateShelf(book: IBook, shelf: string): void;
}

export const SearchResult: FC<Props> = ({ books, updateShelf }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books.sort(compareFunction("title")).map(book => (
          <li key={book.id}>
            <Book book={book} updateShelf={updateShelf} />
          </li>
        ))}
      </ol>
    </div>
  );
};
