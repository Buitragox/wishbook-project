import React from "react";

export default function Spinner() {
  return (
    <div className="vertical-center">
      <div className="spinner-grow my-spinner align-middle" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h2>Loading...</h2>
    </div>
  );
}
