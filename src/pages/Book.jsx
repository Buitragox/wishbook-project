import React from "react";
import { useParams } from "react-router-dom";

import { useFirestore, useFirestoreDocData } from "reactfire";
import Spinner from "../components/spinner/Spinner";

export default function Book(props) {
  const { id } = useParams();
  const bookRef = useFirestore().collection("books").doc(id);
  const { data, status } = useFirestoreDocData(bookRef);
  return (
    
    <div className="container">    
    {status === "success" && (
        <div className="row p-5">
          <div className="col">
            <div className="row">
              <img src={"../" + data.img} alt="" />
            </div>
          </div>
          <div className="col-8">
            <h2>Title: {data.title}</h2>
            <h2>Genre: {data.genre}</h2>
            <h2>Language: {data.language}</h2>
            <h2>Pages: {data.pages}</h2>
            <h4>price: ${data.price}</h4>
            <hr></hr>
            <h2>{data.descrip}</h2>
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
    </div>
  );
}
