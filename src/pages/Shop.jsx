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
  const [price, setPrice] = useState("option1");
  const [language, setLanguage] = useState("option1");
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

  return (
    <div className="row p-3">
      <ToastContainer />
      <aside className="col-xs-12 col-sm-12 col-md-12 col-lg-2 minwitdh">
        <form className="pt-3" action="" method="get">
          <center>
            <button
              className="btn btn-dark pruebaBotonMorado text-nowrap"
              type="submit"
            >
              Apply Filter
            </button>
          </center>
          <h5>Genre</h5>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className="pruebaBotonMorado">
              {lastClicked}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Fiction and Literature</DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Some")}>
                Some Action
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Kids")}>
                For Kids
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Educational</DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Some")}>
                Some Action
              </DropdownItem>
              <DropdownItem onClick={() => setLastClicked("Foo")}>
                Foo Action
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
              id="radioLanguage1"
              checked={language === "option1"}
              onChange={() => setLanguage("option1")}
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
              checked={language === "option2"}
              onChange={() => setLanguage("option2")}
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
              checked={language === "option3"}
              onChange={() => setLanguage("option3")}
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
              checked={language === "option4"}
              onChange={() => setLanguage("option4")}
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
          })}
        </div>
      </div>
    </div>
  );
}
