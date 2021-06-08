import "./styles.css";
import React, { useState, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Spinner from "./components/spinner/Spinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Help from "./pages/Help";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";
import Footers from "./components/footer/Footer";
import BooksContext from "./contexts/BooksContext";
import "firebase/firestore";
import { useFirestoreCollectionData, useFirestore } from "reactfire";

export default function App() {
  //const booksData = useFirestoreCollectionData("books");
  const dataRef = useFirestore().collection("books");
  const query = dataRef.orderBy("title", "asc");
  const bookData = useFirestoreCollectionData(query, { idField: "id" });
  const { data, status } = bookData;
  const [cart, setCart] = useState([]);

  const getElemById = (id) => {
    var book = {};
    data.forEach((elem) => {
      if (elem.id === id) {
        book = elem;
      }
    });
    return book;
  };

  const addItem = (id) => {
    const item = getElemById(id);
    var flag = false;
    var newCart = cart.map((elem) => {
      var ob = {};
      if (elem.data.id === item.id) {
        ob = { ...elem };
        ob.amount += 1;
        flag = true;
        return ob;
      } else {
        ob = { ...elem };
        return ob;
      }
    });
    if (!flag) {
      newCart.push({ data: item, amount: 1 });
    }
    setCart(newCart);
  };

  const deleteItem = (id) => {
    var newCart = [];
    cart.forEach((elem) => {
      if (elem.data.id !== id) newCart.push(elem);
    });
    // if (newCart.length === 1 && newCart[0] === undefined) newCart = [];
    setCart(newCart);
  };

  const deleteAll = () => {
    setCart([]);
  };

  return (
    <div className="app">
      {status === "success" && (
        <div>
          <header>
            <Navbar />
          </header>
          <body className="">
            <div className="container-fluid">
              <BooksContext.Provider
                value={{
                  books: data,
                  cart: cart,
                  addCart: addItem,
                  removeCart: deleteItem,
                  emptyCart: deleteAll
                }}
              >
                <Suspense>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Signup" component={SignUp} />
                    <Route exact path="/Shop" component={Shop} />
                    <Route exact path="/About" component={About} />
                    <Route exact path="/Help" component={Help} />
                    <Route exact path="/Book/:id" component={Book} />
                    <Route exact path="/Cart" component={Cart} />
                    <Route path="/" component={NotFound} />
                  </Switch>
                </Suspense>
              </BooksContext.Provider>
            </div>
          </body>
          <Footers />
        </div>
      )}
      {status === "loading" && <Spinner />}
      {status === "error" && (
        <div className="vertical-center">
          <h2>
            There has been an error while loading the web page. Plase try again
            later.
          </h2>
        </div>
      )}
    </div>
  );
}
