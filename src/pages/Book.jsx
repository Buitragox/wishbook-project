import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";
import { useUser } from "reactfire";
import { useFirestore, useFirestoreDocData } from "reactfire";
import Spinner from "../components/spinner/Spinner";
import useBooks from "../hooks/useBooks";

export default function Book(props) {
  const { id } = useParams();
  const bookRef = useFirestore().collection("books").doc(id);
  const { data, status } = useFirestoreDocData(bookRef, { idField: "id" });
  const user = useUser();
  const { addCart } = useBooks();
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
    <div className="container">
      <ToastContainer />
      {status === "success" && data.hasOwnProperty("title") && (
        <div className="row p-5">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2">
            <div className="row">
              <img src={"../" + data.img} alt="" />
            </div>
          </div>
          <div className="col">
            <h2>Title: {data.title}</h2>
            <h2>Genre: {data.genre}</h2>
            <h2>Language: {data.language}</h2>
            <h2>Pages: {data.pages}</h2>
            <h4>Price: ${data.price}</h4>
            <hr></hr>
            <h3>{data.descrip}</h3>
            {""}
            <center>
              <button
                className="btn btn-primary text-nowrap btn-0"
                id={data.id}
                onClick={(ev) => {
                  update(ev.target.id);
                }}
              >
                Add to cart
              </button>
            </center>
          </div>
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
      {status === "success" && !data.hasOwnProperty("title") && (
        <div className="vertical-center">
          <center>
            <h2>The book you are looking for does not exists.</h2>
            <img src="../img/sad.png" alt="" style={{ width: "300px" }} />
            <h2>Try looking in our shop!</h2>
          </center>
        </div>
      )}
    </div>
  );
}
