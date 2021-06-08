import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";
import { useUser } from "reactfire";

import useBooks from "../hooks/useBooks";

export default function Shop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [lastClicked, setLastClicked] = useState("Select a genre");
  const [price, setPrice] = useState("default");
  const [language, setLanguage] = useState("default");
  const { books, addCart } = useBooks();
  const user = useUser();
  const notify = (flag) => {
    if (flag)
      toast.success("Book added to cart!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    else
      toast.error("Please log in first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
  };
  const update = (id) => {
    if (user.data !== null) {
      addCart(id);
      notify(true);
    } else notify(false);
  };

  const show = (index) => {
    var book = books[index];
    const bookPrice = parseInt(book.price, 10);
    var lowPrice = 0;
    var highPrice = 10000000;
    if (price === "option1") {
      lowPrice = 0;
      highPrice = 10000;
    } else if (price === "option2") {
      lowPrice = 10000;
      highPrice = 25000;
    } else if (price === "option3") {
      lowPrice = 25000;
      highPrice = 50000;
    } else if (price === "option4") {
      lowPrice = 50000;
      highPrice = 100000;
    } else if (price === "option5") {
      lowPrice = 100000;
      highPrice = 10000000;
    }
    if (
      (language === book.language || language === "default") &&
      bookPrice >= lowPrice &&
      bookPrice <= highPrice &&
      (book.genre === lastClicked || lastClicked === "Select a genre")
    ) {
      return true;
    } else return false;
  };

  return (
    <div className="row p-3">
      <ToastContainer />
      <aside className="col-xs-12 col-sm-12 col-md-12 col-lg-2 minwitdh">
        <form className="pt-3" action="" method="get">
          <center>
            <h3>Filtros de busqueda</h3>
          </center>
          <h5>Genre</h5>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className="pruebaBotonMorado">
              {lastClicked}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setLastClicked("Select a genre")}>
                Select a genre
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Fiction and Literature</DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Action")}>
                Action
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Comedy")}>
                Comedy
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Drama")}>
                Drama
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Fantasy")}>
                Fantasy
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Horror")}>
                Horror
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Mistery")}>
                Mistery
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Romantic")}>
                Romantic
              </DropdownItem>

              <DropdownItem divider />
              <DropdownItem header>Educational</DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Politics")}>
                Politics
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <input
            type="text"
            name="genre"
            id="genre"
            value={lastClicked}
            hidden
          />
          <h5>Price</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrice"
              id="radioPriceDefault"
              checked={price === "default"}
              onChange={() => setPrice("default")}
            />
            <label class="form-check-label" htmlFor="radioPriceDefault">
              All prices
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrice"
              id="radioPrice1"
              checked={price === "option1"}
              onChange={() => setPrice("option1")}
            />
            <label class="form-check-label" htmlFor="radioPrice1">
              $0-$10.000
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrice"
              id="radioPrice2"
              checked={price === "option2"}
              onChange={() => setPrice("option2")}
            />
            <label class="form-check-label" htmlFor="radioPrice2">
              $10.000-$25.000
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrice"
              id="radioPrice3"
              checked={price === "option3"}
              onChange={() => setPrice("option3")}
            />
            <label class="form-check-label" htmlFor="radioPrice3">
              $25.000-$50.000
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrice"
              id="radioPrice4"
              checked={price === "option4"}
              onChange={() => setPrice("option4")}
            />
            <label class="form-check-label" htmlFor="radioPrice4">
              $50.000-$100.000
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioPrice"
              id="radioPrice5"
              checked={price === "option5"}
              onChange={() => setPrice("option5")}
            />
            <label class="form-check-label" htmlFor="radioPrice5">
              More than $100.000
            </label>
          </div>
          <h5>Language</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioLanguage"
              id="radioLanguageDefault"
              checked={language === "default"}
              onChange={() => setLanguage("default")}
            />
            <label class="form-check-label" htmlFor="radioLanguageDefault">
              All languages
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioLanguage"
              id="radioLanguage1"
              checked={language === "Spanish"}
              onChange={() => setLanguage("Spanish")}
            />
            <label class="form-check-label" htmlFor="radioLanguage1">
              Spanish
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioLanguage"
              id="radioLanguage2"
              checked={language === "English"}
              onChange={() => setLanguage("English")}
            />
            <label class="form-check-label" htmlFor="radioLanguage2">
              English
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioLanguage"
              id="radioLanguage3"
              checked={language === "Russian"}
              onChange={() => setLanguage("Russian")}
            />
            <label class="form-check-label" htmlFor="radioLanguage3">
              Russian
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radioLanguage"
              id="radioLanguage4"
              checked={language === "German"}
              onChange={() => setLanguage("German")}
            />
            <label class="form-check-label" htmlFor="radioLanguage4">
              German
            </label>
          </div>
        </form>
      </aside>
      {/* <div className="vertical-Line container col-1"></div> */}
      <div className="col-10 mw-100 fullsize">
        <div className=" row">
          {books.map((elem, index) => {
            if (show(index))
              return (
                <Card className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                  <CardImg src={elem.img} />
                  <CardBody>
                    <CardTitle tag="h5">{elem.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {elem.genre}
                    </CardSubtitle>
                    <CardText>
                      <h5>${elem.price}</h5>
                    </CardText>
                    <Link
                      className="btn btn-primary text-nowrap btn-0"
                      style={{ margin: "10px" }}
                      to={{
                        pathname: "/Book/" + elem.id
                      }}
                    >
                      More Details
                    </Link>
                    <button
                      className="btn btn-primary text-nowrap btn-0"
                      id={elem.id}
                      onClick={(ev) => {
                        update(ev.target.id);
                      }}
                    >
                      Add to cart
                    </button>
                  </CardBody>
                </Card>
              );
            else return null;
          })}
        </div>
      </div>
    </div>
  );
}
