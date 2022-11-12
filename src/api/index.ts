import { IBook } from "../typings";

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.getItem("token");

if (!token) {
  token = Math.random().toString(36).substring(-8);
  localStorage.setItem("token", token);
}

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId: string) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then<IBook>(data => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then<IBook[]>(data => data.books);

export const update = (book: IBook, shelf: string) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then(res => res.json());

export const search = (query: string) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then(res => res.json())
    .then(({ books }) => {
      if (!books || "error" in books) return [];
      return books as IBook[];
    });
