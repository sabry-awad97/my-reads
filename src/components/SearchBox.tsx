import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import * as api from "../api";
import { IBook } from "../typings";

interface Props {
  onSearchSuccess: (foundBooks: IBook[]) => void;
}

export const SearchBox: FC<Props> = ({ onSearchSuccess }) => {
  const [query, setQuery] = useState("");
  const searchMutation = useMutation<IBook[], unknown, { query: string }>(
    ({ query }) => api.search(query)
  );

  const updateQuery = (query: string) => {
    setQuery(query);
    searchMutation.mutate(
      { query },
      {
        onSuccess: onSearchSuccess,
      }
    );
  };

  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search"></Link>
      <div className="search-books-input-wrapper">
        <DebounceInput
          debounceTimeout={300}
          minLength={1}
          placeholder="Search by title or author"
          value={query}
          onChange={event => updateQuery(event.target.value)}
        />
      </div>
    </div>
  );
};
