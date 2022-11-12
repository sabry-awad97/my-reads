import "./App.css";

import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Route, Routes } from "react-router-dom";

import * as api from "./api";
import { BookShelves } from "./components/BookShelves";
import { Search } from "./components/Search";
import { groupBy } from "./helpers/groupBy";
import { IBook } from "./typings";

const AppRoutes = () => {
  const { data: books } = useQuery(["books"], () => api.getAll(), {
    initialData: [],
  });

  const shelves = groupBy(books, b => b.shelf);

  const updateMutation = useMutation<
    Response,
    unknown,
    { book: IBook; shelf: string }
  >(({ book, shelf }) => api.update(book, shelf), {
    onSettled: () => queryClient.invalidateQueries(["books"]),
  });

  const updateBooks = (book: IBook, shelf: string) => {
    updateMutation.mutate({ book, shelf });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<BookShelves shelves={shelves} updateShelf={updateBooks} />}
        />
        <Route
          path="/search"
          element={<Search books={books} updateShelf={updateBooks} />}
        />
      </Routes>
    </div>
  );
};

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
