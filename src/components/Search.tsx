import { FC, useState } from "react";

import { IBook } from "../typings";
import { SearchBox } from "./SearchBox";
import { SearchResult } from "./SearchResult";

interface Props {
  books: IBook[];
  updateShelf(book: IBook, shelf: string): void;
}

export const Search: FC<Props> = ({ books, updateShelf }) => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);

  const updateFilteredBooks = (foundBooks: IBook[]) => {
    setFilteredBooks([
      ...new Set(
        foundBooks.map(b => books.find(({ title }) => title === b.title) || b)
      ),
    ]);
  };

  return (
    <div className="search-books">
      <SearchBox onSearchSuccess={updateFilteredBooks} />
      <SearchResult books={filteredBooks} updateShelf={updateShelf} />
    </div>
  );
};
