import { createContext } from "react";

const BooksContext = createContext({
  books: [],
  cart: [],
  addCart: () => {},
  removeCart: () => {},
  emptyCart: () => {}
});

export default BooksContext;
